var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();

var articles = {
    'article-one' : {
        title:'Prasheeba Article One',
        heading:'Article One',
        date:'15 Aug 2017',
        content:`
            <p>
                The purpose of psychology is to give us a completely different idea of the things we know best. 
            </p>`
    },
    'article-two' : {
        title:'Prasheeba Article Two',
        heading:'Article Two',
        date:'15 Aug 2017',
        content:`
            <p>
                If the only tool you have is a hammer, you tend to see every problem as a nail. 
            </p>`
    },
    'article-three' : {
    title:'Prasheeba Article Three',
    heading:'Article Three',
    date:'15 Aug 2017',
    content:`
        <p>
            Everybody should do at least two things each day that he hates to do, just for practice. 
        </p>`
    }
};

function createTemplate (data) {
    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
    var htmltemplate = `
     <html>
        <head>
            <title>
                ${title}
            </title>
            <meta name="viewport" content="width=device=width, initial-scale=1" />
            <link href="/ui/style.css" rel="stylesheet" />
            
        </head>
        <body>
            <div class="container">
                <div>
                    <a href="/">Home</a>
                </div>
                <hr/>
                <h3>
                    ${heading}
                </h3>
                <div>
                    ${date}
                </div>
                <div>
                    ${content}
                </div>
            </div>
        </body>
    </html>   
    `;
    return htmltemplate;
}

app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter = 0;
app.get('/counter', function (req, res) {
    counter = counter + 1;
  res.send(counter.toString());
});

var names = [];
app.get('/submit-name', function (req, res) {
    //Get the name from the request
    var name = req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));
});

app.get('/:articleName', function (req, res) {
    var articleName = req.params.articleName;
  res.send(createTemplate(articles[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
