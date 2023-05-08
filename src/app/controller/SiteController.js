const Course = require("../models/Course");
const { mutipleMongooseToObject: mutipleMgToObj } = require("../../ulti/mongoose")

class SiteController {
	index(req, res, next) {
		Course.find({})
			.then((courses) => {
				courses = mutipleMgToObj(courses)
				res.render("home", { courses })
			})
			.catch(next);
	}
	search(req, res) {
		res.render("search");
	}

	
}

module.exports = new SiteController;
