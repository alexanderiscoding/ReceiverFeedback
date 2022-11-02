export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if ([1, 2, 3, 4, 5].includes(req.body.level) && req.body.text.length > 0 && req.body.text.length < 250) {
    return fetch(process.env.CRUD_HOST + '/api/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': process.env.CRUD_TOKEN
      },
      body: JSON.stringify({
        table: {
          name: "FeedbackForWeb"
        },
        column: {
          level: req.body.level,
          text: req.body.text,
          source: req.body.source,
          version: req.body.version,
          uniqueId: req.body.uniqueId,
          systemName: req.body.systemName,
          systemVersion: req.body.systemVersion,
          timestamp: new Date().getTime()
        }
      })
    })
    .then(async function () {
      const data = await response.json();
      if (process.env.SENDER_HOST != undefined) {
        let message;
        if (req.body.source) {
          message = "Um novo FeedbackForWeb foi registrado %0aSource: " + req.body.source + " %0aID: " + data + "%0aLevel: " + req.body.level;
        } else {
          message = "Um novo FeedbackForWeb foi registrado %0aID: " + data + "%0aLevel: " + req.body.level;
        }
        return fetch(process.env.SENDER_HOST + '/api/telegram', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': process.env.SENDER_TOKEN
          },
          body: JSON.stringify({
            message: message
          })
        })
        .then(function () {
          res.status(200).json(data);
        })
        .catch(function (error) {
          res.status(500).json(error);
        });
      } else {
        res.status(200).json(data);
      }
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
  } else {
    return res.status(401).json('Information send is incorrect.');
  }
}
