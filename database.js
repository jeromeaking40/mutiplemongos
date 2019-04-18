const mongoose = require('mongoose');

// Create an customers array
const customers = [
	{
		dbName: 'test1',
		port: 4001
	},
	{
		dbName: 'test2',
		port: 4002
	}
];

// This will be a Customer.find().select(dbName) in production code
function getAllCustomerDBs() {
	let customerDB = customers.map(customer => {
		return customer.dbName;
	});

	console.log('All customerDBs', customerDB);
	return customerDB;
}

// Connect all multiple databases
function connectMultipleDBs(multipleDBs) {
	// Loop through the Customer DB array and connect each instance
	multipleDBs.forEach(customerDBName => {
		mongoose
			.connect(`mongodb://127.0.0.1/${customerDBName}`, {
				useNewUrlParser: true
			})
			.then(() => {
				console.log(`${customerDBName} database connected succesfully!`);
			})
			.catch(err => {
				console.log('There was an error connecting to the DB', err);
			});
	});
}

// Start the database connection
function startDB() {
	mongoose
		.connect('mongodb://127.0.0.1/multiplemongos', { useNewUrlParser: true })
		.then(() => {
			console.log('Dev database connected succesfully!');

			// Get all Customer Database names
			let allDatabases = getAllCustomerDBs();

			connectMultipleDBs(allDatabases);
		})
		.catch(err => {
			console.log('There was an error connecting to the DB', err);
		});
}

module.exports = startDB;
