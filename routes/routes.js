const {Router} = require('express')
const route = Router()
const controller = require('../controller/controller')

route.get('/', controller.get_home)

route.delete('/delete/:id', controller.delete_staff)
route.get('/admin',controller.get_admin )

route.get('/add-staff', controller.get_add_staff)
route.post('/add-staff', controller.post_add_staff)
route.get('/view-staff', controller.get_staffs)

route.post('/log-in', controller.post_log_in)
route.get('/log-in', controller.get_log_in)

route.get('/leave/:id', controller.get_leave)
route.patch('/leave/:id', controller.patch_leave)
route.get('/leave-staffs', controller.get_leave_staffs)
route.get('/leave-detail/:id', controller.get_leave_detail)
route.patch('/leave-detail/:id', controller.patch_leave_detail)

module.exports = route