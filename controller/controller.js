const Staff = require('../model/addStaffModel')
const jwt = require('jsonwebtoken')

// jwt function

const createToken = (id) =>{
	return jwt.sign({user:id}, 'json_sectret_key', {expiresIn:'3d'})
}

exports.get_home = (req, res) => {
	res.render('home', {title:'home'});
};

// ! log in controller
exports.get_log_in = (req, res) => {
	res.render('log-in',{title:'log-in'});
};
exports.post_log_in = async (req, res) => {
	try {
		const staffId = await Staff.findOne({ staffId: req.body.staffId });
		const password = await Staff.findOne({ password: req.body.password });

		if (staffId && password) {
			res.render('staff-page', { staff:staffId, title:'staff-page' });
			// let token = createToken(staffId._id)
			// res.cookies('jwt',token,{maxAge:3*100})
		}else{
            res.send('username or password incorrect')
        }
	} catch (err) {
		console.log(err);
	}
};

// ! admin controller
exports.get_admin = (req, res) => {
	const reject = () => {
		res.setHeader('www-authenticate', 'Basic');
		res.sendStatus(401);
	};
	const authorization = req.headers.authorization;
	if (!authorization) {
		return reject();
	}
	const [username, password] = Buffer.from(
		authorization.replace('Basic', ''),
		'base64'
	)
		.toString()
		.split(':');
	if (!(username == 'project-group' && password === 'project-group')) {
		return reject();
	}
	res.render('admin', {title:'admin'});
};

exports.get_add_staff = (req, res) => {
	res.render('add-staff',{title:'add-staff'});
};

exports.post_add_staff = async (req, res) => {
	const newStaff = new Staff({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		surName: req.body.surName,
		staffId: req.body.staffId,
		department: req.body.department,
		password: req.body.password,
	});

	try {
		const staff = await newStaff.save();
		res.redirect('/view-staff');
	} catch (err) {
		console.log(err);
	}
};

exports.get_staffs = async (req,res) =>{
    try{
        const staffs = await Staff.find()
        res.render('view-staffs', {staffs, title:'staffs'})
    }catch(err) {
        console.log(err)
    }
}


exports.delete_staff = async (req,res) =>{
	try{
		await Staff.findByIdAndDelete(req.params.id)
		res.redirect('/view-staff')
	}catch(err){
		console.log(err)
	}
}

exports.get_leave = async (req,res) =>{
	try{
		let staff = await Staff.findById(req.params.id)
		res.render('leave',{staff,title:'leave'})
	}catch(err){
		res.status(404)
		console.log(err)
	}
}

exports.patch_leave =async (req,res) =>{
	try{
		let staff = await Staff.findByIdAndUpdate(req.params.id,{
			reason:req.body.reason,
			date: req.body.date
			},{new:true})
			res.send('letter send')
	}catch(err){
		console.log(err)
	}
}


exports.get_leave_staffs =async (req,res) =>{
	try{
		let staffs= await Staff.find().sort({date: -1})
		res.render('leave-staffs', {staffs, title:'leave-staffs'})
	}catch(err){
		console.log(err)
	}
}

exports.get_leave_detail =async (req,res) =>{
	try{
		let staff = await Staff.findById(req.params.id)
		res.render('leave-detail', {staff, title:'leave-staff'})
	}catch(err){
		console.log(err)
	}
}


exports.patch_leave_detail =async (req,res) =>{
	try{
		let staff = await Staff.findByIdAndUpdate(req.params.id,{
			accept: req.body.accept
			},{new:true})
			res.redirect('/leave-staffs')
	}catch(err){
		console.log(err)
	}
}