const {body}=require("express-validator");
exports.registervald=[
    body("name")
    .exists({exist:true})
    .withMessage("name is required")
    .trim()
    .notEmpty()
    .withMessage("name cant be empty")
    .isLength({min:3})
    .withMessage("name's must be obove 3"),

    body("email")
    .exists({exist:true})
    .withMessage("email is required")
    .trim()
    .isEmail()
    .withMessage("email is invalid")
    .normalizeEmail(),

    body("password")
    .exists({exist:true})
    .withMessage("password must be required")
    .isLength({min:6})
    .withMessage("password's length")
    

];
exports.loginvald=[
    body("email")
    .exists({exist:true})
    .withMessage("email is required")
    .trim()
    .isEmail()
    .withMessage("invalid email"),

    body("password")
    .exists({exist:true})
    .withMessage("passord must be required"),

];