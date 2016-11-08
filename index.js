var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', upload.array(), function (req, res) {
	if(Object.keys(req.body).length == 0)
	{
		res.sendStatus(404);
	}
	else
	{
		res.json(req.body);
	}
});

app.get('/', function (req, res) {
	res.status(200).send('Hello Express.js');
});

app.get('/hello', function (req, res) {
	res.status(200).send('Hello stranger !');
});

app.get('/hello/:name', function (req, res) {
	res.status(200).send('Hello, ' + req.params.name + ' !');
});

app.all('/sub/:first_param/:second_param', function (req, res) {
	res.status(200).send('You requested URI: ' + req.params.first_param + '\/' + req.params.second_param);
});

app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});



//Домашнее задание
//
//Создать приложение на Express.js которое будет иметь 5 вариаций роутов
//
//GET / - Главная страница которая вернет код 200 OK и покажет текст "Hello Express.js"
//GET /hello - Страница, код ответа 200 OK и покажет текст "Hello stranger !"
//GET /hello/[любое имя] - Страница, код ответа 200 OK и покажет текст "Hello, [любое имя] !"
//ANY /sub/[что угодно]/[возможно даже так] - Любая из этих страниц должна показать текст "You requested URI: [полный URI запроса]"
//POST /post - Страница которая вернет все тело POST запроса (POST body) в JSON формате, либо 404 Not Found - если нет тела запроса
//Зачет с отличием
//
//Добавить в роут POST /post - проверку на наличие Header: Key (на уровне middleware), если такого header не существует, то возвращать 401