async function update(id) {
  return fetch(process.env.CLOUD_HOST + '/api/database/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': process.env.CLOUD_TOKEN
    },
    body: JSON.stringify({
      name: "ReceiverFeedback",
      id: id,
      column: {
        feedback: Date.now()
      }
    })
  }).then(function () {
    return true;
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
  res.setHeader('Access-Control-Allow-Origin', '*');
  if ([req.body.level, req.body.text, req.body.source, req.body.version].includes(undefined)) {
    return res.status(406).json("Missing Information");
  }
  let id = await device(req.headers['user-agent'], req.headers['x-vercel-forwarded-for']);
  if (!id) {
    return res.status(401).json("Invalid Device Request");
  }
  let hash = await tagHash(id, req.headers.tag);
  if (new Date().getTime() > Number(req.headers.tag)) {
    return res.status(401).json("Invalid Authentication Credentials");
  }
  if (req.headers.hash != hash) {
    return res.status(401).json("Invalid Authentication Credentials");
  }
  const { randomBytes } = await import('node:crypto');
  const token = randomBytes(8).toString('hex');
  if ([1, 2, 3, 4, 5].includes(req.body.level) && req.body.text.length > 0 && req.body.text.length < 250) {
    return fetch(process.env.CLOUD_HOST + '/api/firestore/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': process.env.CLOUD_TOKEN
      },
      body: JSON.stringify({
        table: {
          name: "ReceiverFeedback"
        },
        column: {
          level: req.body.level,
          text: req.body.text,
          source: req.body.source,
          version: req.body.version,
          application: req.body.application,
          timestamp: Date.now(),
          token: token
        }
      })
    }).then(async function () {
      let salved = await update(id);
      if (salved) {
        res.status(200).json("Information created");
      } else {
        res.status(500).json("Update information in Cloud failed.");
      }
    }).catch(function () {
      res.status(500).json("Insert information in Cloud failed.");
    });
  } else {
    return res.status(401).json('Send information is incorrect');
  }
}
