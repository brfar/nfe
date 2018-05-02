/*eslint-disable*/
const router = require('express').Router();
const Todo = require('../models/todo');
const moment = require('moment');

var diaInicio = moment().subtract(2, "days").format("DD%2fMM%2fYYYY");
var diaHoje = moment().format("DD%2fMM%2fYYYY"); 

router.get('/', function(req, res) {
	Todo.find({}).then(function(results) {
    let todos = results.filter(function(todo){
      return !todo.done;
    });

    let doneTodos = results.filter(function(todo){
      return todo.done;
    });

		res.render('index', { todos: todos, doneTodos });
	});
});

router.post('/todos', function(req, res) {
	let newTodo = new Todo({ 
    description: req.body.description,
    nome: req.body.nome,
		email: req.body.email,
		date: moment().format("DD-MM-YYYY"),
		link: `https://nfse.recife.pe.gov.br/contribuinte/NotasEmitidas.aspx?Inscricao=5333512&Inicio=${diaInicio}&Fim=${diaHoje}&Nome=${req.body.nome}&returnUrl=~%2fcontribuinte%2fConsultas.aspx%3fInscricao%3d5333512%26Inicio%3d${diaInicio}%26Fim%3d${diaHoje}%26Nome%3d${req.body.nome}`
  });
	newTodo
		.save()
		.then(function(result) {
			// console.log(result);
			res.redirect('/');
		})
		.catch(function(err) {
			console.log(err);
			res.redirect('/');
		});
});

router.post('/todos/:id/completed', function(req, res) {
	let todoId = req.params.id;

	Todo.findById(todoId)
		.exec()
		.then(function(result) {
			result.done = !result.done;
			return result.save();
		}).then(function(result){
      res.redirect('/');
    });

	// console.log(req.params);
});

module.exports = router;
