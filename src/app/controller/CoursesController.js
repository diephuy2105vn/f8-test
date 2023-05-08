const Course = require("../models/Course");
const { mutipleMongooseToObject,  mongooseToObject } = require("../../ulti/mongoose")

class CoursesController {
	show(req, res, next) {
		Course.findOne({ slug: req.params.slug })
            .then(course => {
                res.render('courses/show', {
                    course: mongooseToObject(course)
                })
            })
            .catch(next)
	}

    create(req, res, next) {
        res.render('courses/create')
    }

    //POST /courses/save
    saved(req, res, next) {
        req.body.image = `https://i.ytimg.com/vi/${req.body.videoId}/hq720.jpg`
        const course = new Course(req.body);
            course.save()
            .then(() => res.redirect('back'))
            .catch(next)
    }

    
    store(req, res, next) {
        Promise.all([
            Course.find().sortable(req) ,
            Course.countDocumentsDeleted({})])
                .then(([courses, countDeleted])  =>  res.render('courses/store', {
                    countDeleted,
                    courses: mutipleMongooseToObject(courses)
                }))
                .catch(next)
    }

    trash(req, res, next) {
        Course.findDeleted({})
            .then(courses =>  res.render('courses/trash', {
                courses: mutipleMongooseToObject(courses)
            }))
            .catch(next)
       
    }

    handleAction(req, res, next) {
        switch(req.body.action) {
            case 'delete': 
                Course.delete({_id: { $in: req.body.coursesIds}})
                    .then(() => res.redirect('back'))
                    .catch(next)
                break;
            default: res.json({message: 'Acction is invalid!'})    
        }
    }

    // Edit Courses
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course => {
                res.render('courses/edit', {
                    course: mongooseToObject(course)
                })
            })
            .catch(next)
       
    }
    // [PUT] /courses/update/:id
    update(req, res, next) {
        Course.updateOne({_id: req.params.id }, req.body)
        .then(() => res.redirect('/courses/store'))
        .catch(next)
    }

    restore(req, res, next) {
        Course.restore({_id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [DELETE] /courses/delete/:id
    delete(req, res, next) {
        Course.delete({_id: req.params.id})
            .then(() => {
                res.redirect('back')
            } )  
            .catch(next)
    }

    deleteForce(req, res, next) {
        Course.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }


}

module.exports = new CoursesController;