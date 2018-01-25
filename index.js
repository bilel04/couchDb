const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const NodeCouchDb = require('node-couchdb');
const cors = require('cors');
var unirest = require('unirest');


const app = express();
app.get('/', function(req, res){
unirest.get('https://6f1a1a43-fcc2-46dd-89ed-1c7ed7e4c01f-bluemix.cloudant.com/user/_design/allUsers/_view/users')
    .headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Basic NmYxYTFhNDMtZmNjMi00NmRkLTg5ZWQtMWM3ZWQ3ZTRjMDFmLWJsdWVtaXg6QmlsZWwwNGJpbGVsMDRiaWxlbDA0'
    })
    .end(function(response) {
        res.render('index', {
            users:response.body.rows
        });
        //console.log("the list of databases are, " + JSON.stringify(response.body.rows));
    });
});
/*
const couchExternal = new NodeCouchDb({
    host: '6f1a1a43-fcc2-46dd-89ed-1c7ed7e4c01f-bluemix.cloudant.com/user/_design/allUsers/_view/users',
    protocol: 'https',
    port: 6984,
    auth: {
        user: '6f1a1a43-fcc2-46dd-89ed-1c7ed7e4c01f-bluemix',
        pass: 'Bilel04bilel04bilel04'
    }
});

const dbname = '6f1a1a43-fcc2-46dd-89ed-1c7ed7e4c01f-bluemix/user';
const viewUrl = '_design/allUsers/_view/users';

couchExternal.listDatabases().then(function (dbs) {
    console.log(dbs);
},
function(err){
    console.log(err);
});

*/
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
/*
app.get('/', function(req, res){
    couchExternal.get(dbname, viewUrl).then(
        function(data, headers, status){
            console.log(data.data.rows);
            res.render('index', {
                users:data.data.rows
            });
        },
        function(err){
            console.log(err);
            res.send(err);
        }
    );
});

*/


app.listen(8080, function () {
    console.log('Server on port 8080');
});