var express = require('express');
var firebase = require('firebase');
 
var app = express();

firebase.initializeApp({
	serviceAccount: "xxxx.json",
	databaseURL: "https://xxxx.firebaseio.com/"
});

app.get('/getsecciones', function(req, res) {
	firebase.database().ref('/secciones/').once('value').then(function(snapshot) {
		if (snapshot.val()) {
			res.status(200).send(snapshot.val());
		};
	});
});
hello
app.get('/getconclusiones', function(req, res) {
	firebase.database().ref('/conclusiones/').orderByKey().once('value').then(function(snapshot) {
		if (snapshot.val()) {
			var conclusiones = snapshot.val();

			res.status(200).send(conclusiones);
		};

	});
});

app.get('/getconclusiones/seccion/:seccionId', function(req, res) {
	var seccionId = req.params.seccionId;

	firebase.database().ref('/conclusiones/').orderByChild('seccion').equalTo(seccionId).once('value').then(function(snapshot) {
		if (snapshot.val()) {
			var conclusiones = snapshot.val();

			res.status(200).send(conclusiones);
		};

	});
});

app.get('/getconclusiones/id/:conclusionId', function(req, res) {
	var conclusionId = req.params.conclusionId;

	firebase.database().ref('/conclusiones/' + conclusionId).once('value').then(function(snapshot) {
		if (snapshot.val()) {
			var conclusion = {
				id: conclusionId,
				contenido: snapshot.val().contenido,
				seccion: snapshot.val().seccion,
				entities: snapshot.val().entities
			};
			if (snapshot.val().display) {
				conclusion.display = snapshot.val().display;
			};
			if (snapshot.val().subseccion) {
				conclusion.subseccion = snapshot.val().subseccion;
			};

			res.status(200).send(conclusion);
		}
	});
});
 
var server = app.listen(process.env.PORT || '8080', function () {
	console.log('App listening on port %s', server.address().port);
	console.log('Press Ctrl+C to quit.');
});
