const app = require('express')();
const httpServer = require('http').Server(app);
const startDB = require('./database');

httpServer.listen(4000, err => {
	if (err) {
		process.exit(1);
	}

	startDB();
	console.log('Server up and running!');
});
