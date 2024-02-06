import pkg from "pg";

const {Pool} =pkg;

const pool= new Pool({
    user:"postgres",
    host:"localhost",
    database:"mydb",
    password:"12345678",
    port:5432
})

export default pool;