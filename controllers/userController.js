const bcrypt = require('bcryptjs')
const userService = require("../services/users.service");

exports.register = (req, res, next) => {
    const { password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    console.log(req.body)

    req.body.password = bcrypt.hashSync(password, salt);

    userService.register(req.body, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        })
    })
}

exports.login = (req, res, next) => {
    const { email, password } = req.body;
    userService.login({ email, password }, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        })
    })
}
exports.userProfile = (req, res, next) => {
    return res.status(200).json({
        message: "User Profile",
        data: req.user 
    });
};