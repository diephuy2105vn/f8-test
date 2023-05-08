const newsRouter = require("./news");
const coursesRouter = require("./courses");
const siteRouter = require("./site");

function routes(app) {
	app.use("/news", newsRouter);
	app.use("/courses", coursesRouter);
	app.use("/", siteRouter);
}

module.exports = routes;
