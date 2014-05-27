var db = require('promised-mongo')(process.env.MONGODB || 'article');

db.collection('categories').insert([{"id":"0","name":"New"},{"id":"1","name":"Unclassable"}]);