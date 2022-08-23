const express = require('express')
const app = express();
let dotenv = require('dotenv');
dotenv.config();
const superagent = require('superagent');
const request = require('request');
const bodyParser = require('body-parser');
const PORT = process.env.PORT;
const cors = require('cors')

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.use(cors());

app.get('/',(req,res) => {
    res.send('<a href="https://github.com/login/oauth/authorize?client_id=8461390d1c68e1da8d1e">Login With Github</a>')
})

app.post('/oauth',(req,res) => {
    console.log(req.body)
    const code = req.body.code;
    if(!code){
        res.send('Login Fail')
    }

    superagent
        .post('https://github.com/login/oauth/access_token')
        .send({
            client_id:'8461390d1c68e1da8d1e',
            client_secret:'4691321187e09db5a6262d1c806885f5b81b56ae',
            code:code
        })
        .set('Accept','application/json')
        .end((err,result) => {
            if(err) throw err;
            let access_token = result.body.access_token
            const option = {
                uri: 'https://api.github.com/user',
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `token ${access_token}`,
                    'User-Agent':'mycode'
                }
            }
            request(option,(err,response,body) => {
                console.log(body)
                return res.send(body)
                
            })
        })
})

app.listen(PORT,()=>{
    console.log(`Server is listening to port ${PORT}`)
})