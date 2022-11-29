export default function handler(req, res) {
	if (req.headers.authorization != process.env.TOKEN) {
		return res.status(401).json("Invalid Authentication Credentials");
	}
	return res.status(200).json('Autorized');
}