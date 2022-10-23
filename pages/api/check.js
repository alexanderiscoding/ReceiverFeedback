import { token } from '../../config';

export default async(req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	if (req.headers.authorization != token) {
		return res.status(401).json({ message: 'Invalid Authentication Credentials' });
	}
  res.status(200).send('Autorized');
}
