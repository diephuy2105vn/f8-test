const express = require("express");
const router = express.Router();

const coursesController = require("../app/controller/CoursesController");

router.get("/create", coursesController.create);
router.post("/saved", coursesController.saved);
router.get("/store", coursesController.store);
router.get("/trash", coursesController.trash);
router.get("/edit/:id", coursesController.edit);
router.put("/update/:id", coursesController.update);
router.patch("/restore/:id", coursesController.restore);
router.delete("/delete/:id", coursesController.delete);
router.delete("/deleteforce/:id", coursesController.deleteForce);
router.post("/handle-action", coursesController.handleAction);
router.get("/:slug", coursesController.show);

module.exports = router;
