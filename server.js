

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();


//setting up partials to make the header and footer
hbs.registerPartials(__dirname + '/views/inc/');

//setting up function to run
hbs.registerHelper('copyright', ()=> {
    return new Date().getFullYear();
});

//setting up function
hbs.registerHelper('CapTitle',(text) => {
    return text.toUpperCase();
});
//setting up views hbs files
app.set('view engine','hbs');

//shuting down the server for maintenance!
// app.use((req, res, next ) => {
//     res.render('maintenace.hbs');
// });


//setting up static html files on public folder
app.use(express.static(__dirname + '/public'));
const port = process.env.PORT || 3000;

//setting up middleware feature, its function when loading the page (same as callback function)
//the following is request timestamp
app.use((req, res, next)=> {
    var now = new Date().toString();
    var log = `${now}: ${req.method} - ${res.statusCode} - ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to write on file');
        }
    });
    console.log(log);
    next();
});



app.get('/',(req, res)=>{
    res.render('home.hbs',{
        title: 'Homepage',
        welcomeBody: 'Welcome to homepage!',
        //copyright: new Date().getFullYear()
    });
})


app.get('/express', (req, res) => {
    res.send('<h1>Hello Express!</h1>');

});

//using hbs render from folder: views
app.get('/support', (req, res) => {
    res.render('support.hbs',{
        title: 'Support Page!',
        welcomeBody: 'Welcome to the support page, Please use contact us page in order to contact us',
        //copyright: new Date().getFullYear()
    });
});

app.get('/about', (req, res) => {
    res.send('<p>About Page!</p>');
});

app.get('/json',(req, res) => {
        //send JSON
        res.send({
            name: 'Yasir',
            likes: [
                'Computers',
                'Games'
            ]
        });
});


app.get('/bad', (req, res) => {
    res.send({
        status: 'Page not found'
    });
});


app.listen(port,() => {
    console.log(`\n[+] WebServer running on port: ${port}\n`);
});
