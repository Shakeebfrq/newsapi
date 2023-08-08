const express = require('express');
const bodyParser = require('body-parser');
const routes  = require('express').Router();
//const newsArticle = require('./routes/newsArticle');
const {signin,signup} = require('./controllers/authController');

const app  = express();
app.use(routes);
app.use(bodyParser.json());

routes.use(bodyParser.json());

const PORT = 2000;




routes.get('/',(req,res)=>{
    return res.status(200).send("wlecome to the newsArticle");

});

//routes.use('/news', newsArticle);


routes.post('/register',signup );

routes.post('/signin',signin);

app.listen(PORT, (error)=>{
    if(!error){
        console.log("server has started succefully");;
    }else{
        console.log("error occured");
    }
})


