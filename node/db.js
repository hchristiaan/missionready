function insertNewUser(emailaddress,password,phonenumber) {
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "G00dday1",
    database: "mydb"
  });
  
  var sql1 = 'insert into users (emailaddress,password,phonenumber) values("';
  var sql2 = emailaddress + '"'+',"' + password + '"'+',"' + phonenumber + '");';
  var sql = sql1 + sql2; 

  con.connect(function(err) {
    if (err) throw err;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      console.log(fields);
      con.end();
    });
    
  });
};

function updateNewUserVerified(emailaddress,verified) {
  var mysql = require('mysql');

  var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "G00dday1",
      database: "mydb"
    });
    
    var sql1 = 'UPDATE USERS SET verified =' + verified;
    var sql2 = " WHERE emailaddress = '"+ emailaddress + "'" ;
    var sql = sql1 + sql2; 
    console.log(sql)
    con.connect(function(err) {
      if (err) throw err;
      con.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        console.log(fields);
        con.end();
      });
      
    });
}

function checkPassword(emailaddress, password, callback) {
  var mysql = require('mysql');

  var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "G00dday1",
      database: "mydb"
    });
    
    var sql1 = 'SELECT password FROM USERS';
    var sql2 = " WHERE emailaddress = '"+ emailaddress + "'" ;
    var sql = sql1 + sql2; 
    // console.log(sql)
    con.connect(function(err) {
      if (err) throw callback(err);
      con.query(sql, function (err, result, fields) {
        if (err) throw err;
        var rows = JSON.parse(JSON.stringify(result[0]));
        console.log(rows);
        if (rows.password == password) {
          console.log('OK');
          callback(null,1);
        } 
        else {
          console.log('NOK')
          callback(null,0)
        }
        con.end();
      });
      
    });

    
}

function insertCheckIn(emailaddress, locationID, callback) {
  var mysql = require('mysql');

  var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "G00dday1",
      database: "mydb"
    });
    
    var sql1 = 'insert into checkins (emailaddress,locationID) values("';
    var sql2 = emailaddress + '"'+',"' + locationID + '");';
    var sql = sql1 + sql2; 
    console.log(sql)
    con.connect(function(err) {
      if (err) throw callback(err);
      con.query(sql, function (err, result, fields) {
        if (err) callback(err);
        else callback(null,1)
        con.end();
      });
      
    });

    
}

function checkUniqueEmail(emailaddress) {
  console.log('checkUniqueEmail');
  var mysql = require('mysql');

  var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "G00dday1",
      database: "mydb"
    });
    
    var sql1 = 'SELECT * FROM USERS';
    var sql2 = " WHERE emailaddress = '"+ trim(emailaddress) + "'" ;
    var sql = sql1 + sql2; 

    con.connect(function(err) {
      if (err) throw err;
      con.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        var rows = JSON.parse(JSON.stringify(results[0]));
        console.log(rows);
        if (result) {
          return false;
        }
        else {
          return true;
        }
        con.end();
      });
      
    });
}

module.exports = {
  insertNewUser,
  updateNewUserVerified,
  checkUniqueEmail,
  insertCheckIn,
  checkPassword
}

  