var db = require('promised-mongo')(process.env.MONGODB || 'article');

db.collection('article').drop();
db.collection('categories').drop();
db.collection('comment').drop();
db.collection('contact').drop();
db.collection('login').drop();
db.collection('roles').drop();