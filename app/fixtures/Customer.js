module.exports = function (Customer) {
	Customer.create({
		name: "Mark Benson",
		address: "353 Rochester St, Rialto FL 43250",
		phone: "555-534-2342"
	});

	Customer.create({
		name: "Bob Smith",
		address: "215 Market St, Dansville CA 94325",
		phone: "555-534-2342"
	});

	Customer.create({
		name: "John Draper",
		address: "890 Main St, Fontana IL 31450",
		phone: "555-534-2342"
	});
};