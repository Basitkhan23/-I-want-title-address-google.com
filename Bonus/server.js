const express = require('express');
const path = require('path');
const app = express();

//get routes files
const title = require('./routes/title');

//using route
app.use('/I/want/title',title);

//handling non existing routes
app.use((req,res)=>{
    res.status(404).send('404 - Page Not Foud.');
});

//set view engine
app.set('view engine','pug');
app.set('views', path.join(__dirname, 'views'));

//Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
