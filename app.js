
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

//load customers route
var customers = require('./routes/customers'); 
var partners = require('./routes/partners');
var volunteers = require('./routes/volunteers');
var events = require('./routes/events');
var app = express();

var connection  = require('express-myconnection'); 
var mysql = require('mysql');
var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
        user: "timilehinsobola@gmail.com",
        pass: "Timisho1"
    }
});

// all environments
app.set('port', process.env.PORT || 4300);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*------------------------------------------
    connection peer, register as middleware
    type koneksi : single,pool and request 
-------------------------------------------*/

app.use(
    
    connection(mysql,{
        
        host: 'localhost',
        user: 'root',
        password : '',
        database:'miteda'

    },'pool') //or single

);



app.get('/', routes.index);

//partners routes
// app.get('/customers', customers.list);
// app.get('/customers/add', customers.add);
// app.post('/customers/save', customers.save);
// app.get('/customers/delete/:id', customers.delete_customer);
// app.get('/customers/edit/:id', customers.edit);
// app.post('/customers/edit/:id',customers.save_edit);

//Partners
app.get('/api/partners', partners.list);
app.get('/api/partners/list', partners.lists);
app.get('/api/partners/add', partners.add);
app.post('/api/partners/add', partners.save);
app.get('/api/partners/delete/:id', partners.delete_partner);
app.get('/api/partners/edit/:id', partners.edit);


//Volunteers
app.get('/api/volunteers', volunteers.list);
app.get('/api/volunteers/add', volunteers.add);
app.post('/api/volunteers/add', volunteers.save);
app.get('/api/volunteers/delete/:id', volunteers.delete_volunteer);
app.get('api/volunteers/sendmail/:id', volunteers.sendmail);

//events
app.get('/api/events', events.list);
app.get('/api/events/list', events.lists);
app.get('/api/events/add', events.add);
app.post('/api/events/add', events.save);
app.get('/api/events/delete/:id', events.delete_event);
app.get('/api/events/edit/:id', events.edit);
app.post('/api/events/edit/:id',events.save_edit);

app.get('/send',function(req,res){
    var mailOptions={
        to : req.query.to,
        subject : req.query.subject,
        text : req.query.text
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
     if(error){
            console.log(error);
        res.end("error");
     }else{
            console.log("Message sent: " + response.message);
        res.end("sent");
         }
    });
});



app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
