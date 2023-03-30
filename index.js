const express = require('express');
const app = express();
const port = 8000;
app.use('/assets',express.static(__dirname + '/assets'));
app.set('view engine','ejs');
app.set('views','./views');

//file upload
const upload = require('express-fileupload');
app.use(upload())

app.use('/',require('./routes'));


// port for the server
app.listen(port,function(err){
    if(err){
        console.log(`There was an error in setting up the port : ${err}`);
    }
    else{
        console.log(`The port is up and running on: ${port}`);
    }
})





