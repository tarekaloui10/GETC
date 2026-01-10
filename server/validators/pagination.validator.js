const {query}=require("express-validator");
exports.paginationVlidator=[
    query("page")
    .optional()
    .isInt({min:1})
    .withMessage("page integer must be positive"),

    query("limit")
    .optional()
    .isInt({min:1,max:20})
    .withMessage("limit must be between 1 & 20"),
];