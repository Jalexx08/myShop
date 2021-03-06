const express = require("express");
const cors = require("cors");

const { dbConnection } = require("../database/config");

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;

		this.paths = {
			auth: "/api/auth",
			categories: "/api/categories",
			products: "/api/products",
			sales: "/api/sales",
			users: "/api/users",
		};

		this.connectDB();

		this.middlewares();

		this.routes();
	}

	async connectDB() {
		await dbConnection();
	}

	middlewares() {
		this.app.use(cors());

		this.app.use(express.json()); //* Parsing /reading body to json
	}

	routes() {
		this.app.use(this.paths.auth, require("../routes/auth"));
		this.app.use(this.paths.categories, require("../routes/categories"));
		this.app.use(this.paths.products, require("../routes/products"));
		this.app.use(this.paths.sales, require("../routes/sales"));
		this.app.use(this.paths.users, require("../routes/users"));
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log("Server listening  port", this.port);
		});
	}
}

module.exports = Server;
