export default function handler(req, res) {
  if ([req.query.id, req.query.token].includes(undefined)) {
    return res.status(406).json("Missing Authentication Credentials");
  }
  return fetch(process.env.CLOUD_HOST + '/api/firestore/read', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': process.env.CLOUD_TOKEN
    },
    body: JSON.stringify({
      table: {
        name: "ReceiverFeedback"
      },
      column: {
        id: req.query.id
      }
    })
  }).then(async function (response) {
    const data = await response.json();
    if (data.token != req.query.token) {
      return res.status(401).json("Invalid Authentication Credentials");
    }
    res.status(200).json(data.feedback);
  }).catch(function (error) {
    res.status(500).json(error);
  });
}