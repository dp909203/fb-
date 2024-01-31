const config = require('../config/config');
const db = require('../config/db.config')
const RESPONSE = require('../helper/response')

const User = db.User
const jwt = require('jsonwebtoken');
const Validator = require("validatorjs")
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const { compare } = bcrypt;

//user_register
const register = async (req, res) => {

    // validation to check formet
    const validation = new Validator(req.body, {
        name: ["required", "string", "regex:/^[a-z0-9]+$/"],
        email: "required|string|email",
        number: "required|digits:10",
        password: [
            "required",
            "regex:/^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%?=*&])(?=.*[A-Z]).{8,}$/",
        ],
    });

    //returning error 
    if (validation.fails()) {
        const errorMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(errorMessage));
    }

    try {

        //check email and number
        const existingUser = await User.findOne({
            where: {
                [Op.or]: [
                    { email: req.body.email },
                    { number: req.body.number }
                ]
            }
        });

        if (existingUser) {
            return RESPONSE.error(res, 1016, existingUser)
        }

        const photo = req.regispath;
        const { name, email, password, number } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        //create user
        const user = await User.create({ name, email, password: hashedPassword, photo, number });
        return RESPONSE.success(res, 1010, user)

    } catch (error) {
        console.error(error);
        return RESPONSE.error(res, 9999)
    }
};

//user_login
const login = async (req, res) => {

    // validation to check formet
    const validation = new Validator(req.body, {
        email: "required|string|email",
    });

    // returning error 
    if (validation.fails()) {
        const errorMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(errorMessage));
    }

    try {
        const { email, password } = req.body;
        const findUser = await User.findOne({ where: { email } });

        if (!findUser) {
            return RESPONSE.error(res, 1008, findUser)
        }
        //compare password
        const passwordValid = await compare(password, findUser.password);

        if (!passwordValid) {
            return RESPONSE.error(res, 1001, passwordValid)
        }
        //create token
        const token = jwt.sign({ userId: findUser.id }, 'myLongAndSecureSecretKey1234@!#$%@');

        findUser.token = token;
        await findUser.save();

        return RESPONSE.success(res, 1004, findUser)

    } catch (error) {
        console.error(error);
        return RESPONSE.error(res, 9999)
    }
};

//user_logout
const logout = async (req, res) => {
    try {
        const { email } = req.body;

        const findUser = await User.findOne({ where: { email } });

        if (!findUser) {
            return RESPONSE.error(res, 1012, findUser)
        }

        findUser.token = null;
        await findUser.save();
        return RESPONSE.success(res, 1022)

    } catch (error) {
        console.error(error);
        return RESPONSE.error(res, 9999);
    }
};

//reset_password
const reset_password = async (req, res) => {

    // validation to check formet
    const validation = new Validator(req.body, {
        newPassword: [
            "required",
            "regex:/^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%?=*&])(?=.*[A-Z]).{8,}$/",
        ],
    });

    // returning error 
    if (validation.fails()) {
        const errorMessage = Object.keys(validation.errors.all())[0];
        return RESPONSE.error(res, validation.errors.first(errorMessage));

    }

    try {
        const { email, password, newPassword } = req.body;

        const findUser = await User.findOne({ where: { email } });

        if (!findUser) {
            return RESPONSE.error(res, 1008, findUser)
        }
        //compare password
        const isPasswordMatch = await bcrypt.compare(password, findUser.password);

        if (!isPasswordMatch) {
            return RESPONSE.error(res, 1008, isPasswordMatch)
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        //save password
        findUser.password = hashedPassword;
        await findUser.save();
        return RESPONSE.success(res, 1006)

    } catch (error) {
        console.error(error);
        return RESPONSE.error(res, 9999)
    }
};

//delete_user
const delete_user = async (req, res) => {
    try {
        const { userId } = req.body;

        //find a user
        const user = await User.findByPk(userId);

        if (!user) {
            return RESPONSE.error(res, 1002, user)
        }
        const authUser = req.user;
        // console.log("=============>", authUser);
        //compare user and authuser
        if (user.userId != authUser.userId) {
            return RESPONSE.error(res, 1015)
        }
        //delete user
        await user.destroy();
        return RESPONSE.error(res, 1023)


    } catch (error) {
        console.error(error);
        return RESPONSE.error(res, 9999);
    }
};
module.exports = {
    register,
    login,
    reset_password,
    delete_user,
    logout

}