async function create(id, date) {
  return fetch(process.env.CLOUD_HOST + '/api/database/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': process.env.CLOUD_TOKEN
    },
    body: JSON.stringify({
      name: "ReceiverFeedback",
      id: id,
      column: {
        timestamp: date
      }
    })
  }).then(function () {
    return true;
  }).catch(function (error) {
    console.log(error);
    return false;
  });
}

async function check(access, id, date, tag) {
  return fetch(process.env.CLOUD_HOST + '/api/database/read', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': process.env.CLOUD_TOKEN
    },
    body: JSON.stringify({
      id: 'ReceiverFeedback/' + id
    })
  }).then(async function (response) {
    const data = await response.json();
    if (access == 1) {
      if (!data) {
        return false;
      }
      if (data.timestamp == tag) {
        if (!data.feedback) {
          return true;
        }
      } else {
        return false;
      }
    } else {
      if (data) {
        return false;
      } else {
        let created = await create(id, date);
        if (created) {
          return true;
        } else {
          return false;
        }
      }
    }
  }).catch(function (error) {
    console.log(error);
    return false;
  });
}

async function device(agent, ip) {
  const { createHash } = await import('node:crypto');
  const parser = require('ua-parser-js');
  let ua = parser(agent);
  if (!ip) {
    return false;
  }
  if (ua.device.type == 'mobile') {
    if ([ua.device.vendor, ua.device.model, ua.os.name, ua.os.version].includes(undefined)) {
      return false;
    } else {
      const hash = createHash('sha256');
      hash.update(JSON.stringify([ua.device.vendor, ua.device.model, ua.os.name, ua.os.version, ip]));
      return hash.copy().digest('hex');
    }
  } else {
    if ([ua.engine.name, ua.engine.version, ua.os.name, ua.os.version, ua.cpu.architecture].includes(undefined)) {
      return false;
    } else {
      const hash = createHash('sha256');
      hash.update(JSON.stringify([ua.engine.name, ua.engine.version, ua.os.name, ua.os.version, ua.cpu.architecture, ip]));
      return hash.copy().digest('hex');
    }
  }
}

async function tagHash(id, date) {
  const { createHmac } = await import('node:crypto');
  const hmac = createHmac('sha256', process.env.TOKEN);
  hmac.update(JSON.stringify([id, date]));
  return hmac.digest('hex');
}

export default async function handler(req, res) {
  const date = new Date().getTime() + 30 * 1000;
  if (req.headers.authorization) {
    if (req.headers.authorization != process.env.ACCESS_TOKEN) {
      return res.status(401).json("Invalid Authentication Credentials");
    }
    let id = await device(req.headers['user-agent'], req.headers['x-vercel-forwarded-for']);
    if (!id) {
      return res.status(401).json("Invalid Device Request");
    }
    let approved = await check(0, id, date);
    if (!approved) {
      return res.status(401).json("Invalid Request");
    }
    let hash = await tagHash(id, String(date));
    return res.status(200).json({ tag: date, hash: hash });
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
    let id = await device(req.headers['user-agent'], req.headers['x-vercel-forwarded-for']);
    if (!id) {
      return res.status(401).json("Invalid Device Request");
    }
    if (!req.body.tag) {
      return res.status(401).json("Invalid Request");
    }
    let approved = await check(1, id, date, req.body.tag);
    if (!approved) {
      return res.status(401).json("Invalid Request");
    }
    let hash = await tagHash(id, String(date));
    return res.status(200).json({ tag: date, hash: hash });
  }
}