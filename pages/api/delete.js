export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.headers.authorization != process.env.TOKEN) {
    return res.status(401).json("Invalid Authentication Credentials");
  }
  if (req.body.id == undefined) {
    return res.status(406).json("Missing ID Logger");
  }
  return fetch(process.env.CRUD_HOST + '/api/delete', {
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
        id: req.body.id
      }
    })
  })
  .then(function () {
    res.status(200).json("Deleted");
  })
  .catch(function (error) {
    res.status(500).json(error);
  });
}
