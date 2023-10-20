import mysql from "mysql2/promise";
import bluebird from "bluebird";
import bcypt from "bcryptjs";
import db from "../models/index";
const salt = bcypt.genSaltSync(10);
const hashUserPassword = (userPassword) => {
  let hashPassword = bcypt.hashSync(userPassword, salt);
  return hashPassword;
};
let createNewUser = async (email, password, username) => {
  let hashPass = hashUserPassword(password);
  try {
    await db.User.create({
      username: username,
      email: email,
      password: hashPass,
    });
  } catch (e) {
    console.log(e);
  }
};
let getUserList = async () => {
  let users = [];
  users = await db.User.findAll();
  return users;
};
const deleteUser = async (userId) => {
  await db.User.destroy({
    where: { id: userId },
  });
};
let getUserById = async (id) => {
  let user = {};
  user = await db.User.findOne({
    where: { id: id },
  });
  return user.get({ plain: true });
};
let updateUserInfor = async (email, username, id) => {
  await db.User.update(
    {
      email: email,
      username: username,
    },
    { where: { id: id } }
  );
};
module.exports = {
  createNewUser,
  getUserList,
  deleteUser,
  getUserById,
  updateUserInfor,
};
