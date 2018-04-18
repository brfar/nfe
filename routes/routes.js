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
	// console.log('***********');
	// console.log(req.body.description);  // ESSE É O RPS
	var verifica = geraCodigo();
	let newTodo = new Todo({ 
    description: req.body.description,
    nome: req.body.nome,
		email: req.body.email,
		date: moment().format("DD-MM-YYYY"),
		link: `https://nfse.recife.pe.gov.br/contribuinte/notaprint.aspx?nf=${req.body.description}&inscricao=5333512&verificacao=${verifica}`,
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

function geraCodigo(){
	var codigo = "";
	var alfa = [0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	for (var i=0; i<8; i++){
		var ran = Math.floor(Math.random()*36);
		codigo += alfa[ran];
	}
	return codigo;
}

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
