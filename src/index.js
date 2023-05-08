const express = require("express");
const morgan = require("morgan");
const { create } = require("express-handlebars");
const path = require("path");
const methodOverride = require("method-override");
const sortMiddleware = require("./app/middlewares/SortMiddleware");

const app = express();
const port = 3000;
const db = require("./config/db");
const route = require("./route");

//Connect to Database
db.connect();

app.use(morgan("combined"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(sortMiddleware);

const hbs = create({
	extname: "hbs",
	helpers: {
		sum: (a, b) => a + b,
		sortable: (field, sort) => {
			const isValidType = ["desc", "asc"].includes(sort.type);
			let sortType = isValidType && field === sort.column ? sort.type : "default";

			const icons = {
				default: "fa-sort",
				asc: "fa-arrow-up-wide-short",
				desc: "fa-arrow-down-wide-short",
			};
			const types = {
				default: "desc",
				asc: "desc",
				desc: "asc",
			};

			const icon = icons[sortType];
			const type = types[sortType];

			return `<a href="?_sort&column=${field}&type=${type}">
					<i class="fa-solid ${icon}"></i>
				</a>`;
		},
	},
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views"));

route(app);

app.listen(port);
