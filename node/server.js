// require modules 
const http = require('http');
const fs = require('fs');
const url = require('url')
const crypto = require('crypto')
const sendmail = require('./sendmail.js');
const db = require('./db.js');
const querystring = require('querystring')
const Cookies = require('cookies')
// const Events = require('events');

const servername = 'localhost';
const port = 8080; 

var algorithm = 'aes-256-ctr';
var keys = ['mission ready']

function encrypt(text){
    var cipher = crypto.createCipher(algorithm,'hy78TYrwc')
    var crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
  }

function decrypt(text){
    var decipher = crypto.createDecipher(algorithm,'hy78TYrwc')
    var dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
}

function doVerifyEmail(req,res) {
    console.log('do verifyEmail');
    var q = url.parse(req.url,true);
    var qdata = q.query;
    console.log(qdata.email);
    db.updateNewUserVerified(qdata.email,1);
    console.log('data updated');
    res.writeHead(200, {});  
    res.write('EMail Verified.');
    res.end();
}

function doApi(req,res) {
    console.log('doApi');
    var q = url.parse(req.url,true);
    console.log(q.href.substring(0,16));
    if (q.href.substring(0,16) == '/api/verifyEmail') { 
        doVerifyEmail(req,res); 
    }
}

function doGetFile(req,res) {
    var q = url.parse(req.url,true);
    fileName = '.' + q.href;
    console.log(fileName);
    if (fileName === './') { fileName = './html/index.html'};
    // read the file
	fs.readFile(fileName, function(err, data) {
        if (err) {
            res.writeHead(404, {});
            res.write(fileName  + ' not found');
            res.end();
        } else { 
            if (/.*.jpg/.test(fileName)) {
                res.writeHead(200, { 'Content-Type' : 'image/jpeg'})
            } else { 
                res.writeHead(200, { 'Content-Type' : 'text/html'})
            }
		    res.write(data);
            res.end();
        }
    });
}

function doGet(req,res) {
    var q = url.parse(req.url,true);
    if (q.href.substring(0,5) == '/api/') { doApi(req,res); }
    else doGetFile(req,res);
    
}

function doRegistration(req,res) {
    let rawData = '';
    req.on('data', function(chunk)  {
        rawData += chunk
    });
    req.on('end', function()  {
        console.log(rawData)
        obj = JSON.parse(rawData);
        console.log(obj.phonenumber);
        console.log(obj.password);
        console.log(obj.email);
        sendmail.sendMail(obj.email,servername,port);
        console.log('email sent to : ' + obj.email);
        encryptedPW = encrypt(obj.password);
        console.log(encryptedPW);
        db.insertNewUser(obj.email,encryptedPW,obj.phonenumber);
        console.log('record inserted to db');
    });
              
    res.writeHead(200, {});  
    data = JSON.stringify({'success': 'yes'})
    res.write(data);
    // res.write('You are almost done. We have sent you an email to the email address that you use for registration');
    res.end();
}

function doCheckIn(req,res,cookies) { 
    let rawData = '';
    req.on('data', function(chunk)  {
        rawData += chunk
    });
    req.on('end', function()  {
        obj = JSON.parse(rawData)
        console.log('locationID ' + obj.locationID)
        var username = cookies.get('username', { signed: true })
        console.log(username);
        db.insertCheckIn(username,obj.locationID, function(err,result) {
            if (err) throw err;
            if (result) {
                console.log('OK 1')
                res.write(JSON.stringify({'success' : 'yes'}))
                res.writeHead(200, {}); 
            }
            else {
                console.log('NOK 1')
                res.write(JSON.stringify({'success' : 'no'}))
                res.writeHead(500, {});  
            }
            res.end();
        })
    });
}

function doLogin(req,res,cookies) {

    let rawData = '';
    req.on('data', function(chunk)  {
        rawData += chunk
    });
    req.on('end', function()  {
        let parsedData = querystring.decode(rawData)
        console.log(parsedData); 
        obj = JSON.parse(rawData);
        console.log(obj.username);
        console.log(obj.password);
        encryptedPW = encrypt(obj.password)
        console.log(encryptedPW)
        db.checkPassword(obj.username,encryptedPW, function (err1,result) {
            if (err1) throw err1;
            if (result) {
                cookies.set('username', obj.username , { signed: true })
                console.log('OK 1')
                // res.writeHead(200, {});  
               // res.write('login')
            }
            else {
                console.log('NOK 1')
                res.writeHead(200, {});  
                res.write('login')
            }
            res.end();
        });
    });
} 

function doPost(req,res,cookies) {
    console.log('received a post');
    if (req.url == '/registration') {doRegistration(req,res)}  
    if (req.url == '/checkIn') {doCheckIn(req,res,cookies)} 
    if (req.url == '/login') {doLogin(req,res,cookies)}
};

// create server
const server = http.createServer(function(req, res) { 
    // Create a cookies object
    var cookies = new Cookies(req, res, { keys: keys })
    if ( req.method === 'GET') { doGet(req,res,cookies) };
    if (req.method === 'POST') { doPost(req,res,cookies) };
});

server.listen(port, function() {
    console.log('server started at ' + servername + ':' + port);
});
