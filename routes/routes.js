/*eslint-disable*/
const router = require('express').Router();
const Todo = require('../models/todo');
const moment = require('moment');

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
		date: moment().format("DD-MM-YYYY")
  });

	newTodo
		.save()
		.then(function(result) {
			console.log(result);
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

	console.log(req.params);
});

module.exports = router;
