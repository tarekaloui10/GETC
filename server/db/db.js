const {Pool}=require("pg")/*pg is a  node js library can talk to postgresql*//*pool is manager of databases connections*/
const pool =new Pool ({
    host:"localhost",
    user:"postgres",
    password:"tarekaloui 123",
    database:"getc_db",
    post:5432,
});
module.exports=pool;
