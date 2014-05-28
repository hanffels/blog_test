var db = require('promised-mongo')(process.env.MONGODB || 'whatyouhear');
var fs = require('fs');


db.collection('article').drop();
db.collection('categories').drop();
db.collection('comments').drop();
db.collection('contact').drop();
db.collection('login').drop();
db.collection('roles').drop();

var url_article = 'back/files/article.json';
var url_comments = 'back/files/comment.json';
var url_logins = 'back/files/login.json';
var url_roles = 'back/files/roles.json';
var url_contact = 'back/files/contact.json';
var url_categories = 'back/files/categories.json';

db.collection('comments').insert(JSON.parse(fs.readFileSync(url_comments, 'utf8')));
db.collection('article').insert(JSON.parse(fs.readFileSync(url_article, 'utf8')));
db.collection('login').insert(JSON.parse(fs.readFileSync(url_logins, 'utf8')));
db.collection('roles').insert(JSON.parse(fs.readFileSync(url_roles, 'utf8')));
db.collection('contact').insert(JSON.parse(fs.readFileSync(url_contact, 'utf8')));
db.collection('categories').insert(JSON.parse(fs.readFileSync(url_categories, 'utf8')));