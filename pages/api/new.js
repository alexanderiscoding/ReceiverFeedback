import { CRUDHost, CRUDToken } from '../../config';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const axios = require('axios');
  const type = req.body.type;
  const text = req.body.text;
  if(['bug', 'upgrade', 'report'].includes(type) && text.length > 0 && text.length < 250){
    axios({
      method: 'post',
      url: CRUDHost+'/api/create',
      headers: {'authorization': CRUDToken},
      data: {
        table: {
          name: "feedback"
        },
        column: {
          type: type,
          text: text
        },
      }
    })
    .then(function (response) {
      res.status(200).send(response.data);
    })
    .catch(function (error) {
      res.status(500).send(error);
    });
  }else{
    res.status(204).send("no data send.");
  }  
}
