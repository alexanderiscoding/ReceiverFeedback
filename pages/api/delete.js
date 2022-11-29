export default function handler(req, res) {
  if (req.headers.authorization != process.env.TOKEN) {
    return res.status(401).json("Invalid Authentication Credentials");
  }
  if (req.body.id == undefined) {
    return res.status(406).json("Missing ID");
  }
  return fetch(process.env.CLOUD_HOST + '/api/firestore/delete', {
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
        id: req.body.id
      }
    })
  }).then(function () {
    res.status(200).json("Deleted");
  }).catch(function (error) {
    res.status(500).json(error);
  });
}
