const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-updater");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const mongooseDelete = require("mongoose-delete");

const Course = new Schema(
	{
		// _id: { type: Number },
		name: { type: String, required: true },
		description: { type: String, required: true },
		image: { type: String },
		videoId: { type: String, required: true },
		slug: { type: String, slug: "name", unique: true },
	},
	{
		// _id: false,
		timestamps: true,
	},
);

Course.query.sortable = function (req) {
	if (req.query.hasOwnProperty("_sort")) {
		const isValidType = ["desc", "asc"].includes(req.query.type);
		if (isValidType) {
			return this.sort({
				[req.query.column]: req.query.type,
			});
		} else return this;
	} else return this;
};

// Add plugin
mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
	deletedAt: true,
	overrideMethods: "all",
});
// Course.plugin(AutoIncrement);

module.exports = mongoose.model("Course", Course);
