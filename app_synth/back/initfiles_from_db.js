var db = require('promised-mongo')(process.env.MONGODB || 'whatyouhear');
var fs = require('fs');


url_article = 'back/files/article.json';
url_comments = 'back/files/comment.json';
url_logins = 'back/files/login.json';
url_roles = 'back/files/roles.json';
url_contact = 'back/files/contact.json';
url_categories = 'back/files/categories.json';

var end =0;

db.collection('article').find().toArray().then(function (res){
	fs.writeFileSync(url_article, JSON.stringify(res), "UTF-8");
	console.log('article Done !');
	end++;
	return false;
});
db.collection('categories').find().toArray().then(function (res){
	fs.writeFileSync(url_categories, JSON.stringify(res), "UTF-8");
	console.log('categories Done !');
	end++;
	return false;
});
db.collection('comments').find().toArray().then(function (res){
	fs.writeFileSync(url_comments, JSON.stringify(res), "UTF-8");
	console.log('comments Done !');
	end++;
	return false;
});
db.collection('contact').find().toArray().then(function (res){
	fs.writeFileSync(url_contact, JSON.stringify(res), "UTF-8");
	console.log('contact Done !');
	end++;
	return false;
});
db.collection('login').find().toArray().then(function (res){
	fs.writeFileSync(url_logins, JSON.stringify(res), "UTF-8");
	console.log('login Done !');
	end++;
	return false;
});
db.collection('roles').find().toArray().then(function (res){
	fs.writeFileSync(url_roles, JSON.stringify(res), "UTF-8");
	console.log('roles Done !');
	end++;
	return false;
});

//while (end != 6){}
console.log('END')
