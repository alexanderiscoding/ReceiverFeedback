import { token, CRUDHost, CRUDToken } from '../../config';

export default async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.headers.authorization != token) {
		return res.status(401).json({ message: 'Invalid Authentication Credentials' });
	}
  if (req.body.id == undefined) {
    return res.status(406).json({ message: 'Missing ID Feedback' });
  }
  fetch(CRUDHost + '/api/delete', {
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
        id: id
      }
    })
  })
  .then(function (response) {
    res.status(200).send(response.data);
  })
  .catch(function (error) {
    if (error.response.status == 400) {
      res.status(400).send(error.response.data);
    } else {
      res.status(500).send(error);
    }
  });
}