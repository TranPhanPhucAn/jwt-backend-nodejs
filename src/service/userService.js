import mysql from "mysql2/promise";
import bluebird from "bluebird";
import bcypt from "bcryptjs";

const salt = bcypt.genSaltSync(10);
const hashUserPassword = (userPassword) => {
  let hashPassword = bcypt.hashSync(userPassword, salt);
  return hashPassword;
};
let createNewUser = async (email, password, username) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });
  let hashPass = hashUserPassword(password);
  try {
    const [rows, fields] = await connection.execute(
      `INSERT INTO users (email, password,username) VALUES (?,?,?)`,
      [email, hashPass, username]
    );
  } catch (e) {
    console.log(e);
  }
};
let getUserList = async () => {
  //create connection
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });
  let users = [];
  try {
    const [rows, fields] = await connection.execute("select * from users");
    return rows;
  } catch (e) {
    console.log(e);
  }
};
const deleteUser = async (id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });
  try {
    const [rows, fields] = await connection.execute(
      "delete from users where id=?",
      [id]
    );
    return rows;
  } catch (e) {
    console.log(e);
  }
};
let getUserById = async (id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });
  try {
    const [rows, fields] = await connection.execute(
      "select * from users where id=?",
      [id]
    );
    return rows;
  } catch (e) {
    console.log(e);
  }
};
let updateUserInfor = async (email, username, id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "jwt",
    Promise: bluebird,
  });
  try {
    const [rows, fields] = await connection.execute(
      "update users set email=?, username=? where id=?",
      [email, username, id]
    );
    return rows;
  } catch (e) {
    console.log(e);
  }
};
module.exports = {
  createNewUser,
  getUserList,
  deleteUser,
  getUserById,
  updateUserInfor,
};
