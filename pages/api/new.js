import { CRUDHost, CRUDToken, telegramBotToken, telegramIDGroup } from '../../config';

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if ([1, 2, 3, 4, 5].includes(req.body.level) && req.body.text.length > 0 && req.body.text.length < 250) {
    fetch(CRUDHost + '/api/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': CRUDToken
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
    .then(function (response) {
      let message;
      if (req.body.source) {
        message = "Um novo FeedbackForWeb foi registrado %0aSource: " + req.body.source + " %0aID: " + response.data + "%0aLevel: " + req.body.level;
      } else {
        message = "Um novo FeedbackForWeb foi registrado %0aID: " + response.data + "%0aLevel: " + req.body.level;
      }
      fetch('https://api.telegram.org/bot' + telegramBotToken + '/sendMessage?chat_id=' + telegramIDGroup + '&text=' + message).catch(function (error) {
        res.status(500).send(error);
      });
      res.status(200).send(response.data);
    })
    .catch(function (error) {
      if (error.response.status == 400) {
        res.status(400).send(error.response.data);
      } else {
        res.status(500).send(error);
      }
    });
  } else {
    res.status(400).send('Information send is incorrect.');
  }
}