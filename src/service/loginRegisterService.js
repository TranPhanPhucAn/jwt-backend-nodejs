import db from "../models/index";
import bcypt from "bcryptjs";
import { Op } from "sequelize";
const salt = bcypt.genSaltSync(10);
const hashUserPassword = (userPassword) => {
  let hashPassword = bcypt.hashSync(userPassword, salt);
  return hashPassword;
};
const checkEmailExist = async (email) => {
  let user = await db.User.findOne({
    where: { email: email },
  });
  if (user) {
    return true;
  } else {
    return false;
  }
};
const checkPhoneExist = async (phone) => {
  let user = await db.User.findOne({
    where: { phone: phone },
  });
  if (user) {
    return true;
  } else {
    return false;
  }
};
const registerNewUser = async (rawUserData) => {
  try {
    let isEmailExist = await checkEmailExist(rawUserData.email);
    if (isEmailExist === true) {
      return {
        EM: "The email is already exist",
        EC: 1,
      };
    }
    let isPhoneExist = await checkPhoneExist(rawUserData.phone);
    if (isPhoneExist === true) {
      return {
        EM: "The phone is already exist",
        EC: 1,
      };
    }
    let hassPassword = hashUserPassword(rawUserData.password);
    await db.User.create({
      email: rawUserData.email,
      username: rawUserData.username,
      password: hassPassword,
      phone: rawUserData.phone,
    });
    return {
      EM: "Create user success",
      EC: 0,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "Something wrongs in service",
      EC: -2,
    };
  }
};
const checkPassword = (inputPassword, hassPassword) => {
  return bcypt.compareSync(inputPassword, hassPassword);
};
const handleUserLogin = async (rawData) => {
  try {
    let user = await db.User.findOne({
      where: {
        [Op.or]: [{ email: rawData.valueLogin }, { phone: rawData.valueLogin }],
      },
    });
    if (user) {
      let isCorrectPassword = checkPassword(rawData.password, user.password);
      if (isCorrectPassword === true) {
        return {
          EM: "Ok",
          EC: 0,
          DT: "",
        };
      } else {
      }
    }
    return {
      EM: "Your email/phone or password is incorrect!",
      EC: 1,
      DT: "",
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "Something wrongs in service",
      EC: -2,
    };
  }
};
module.exports = {
  registerNewUser,
  handleUserLogin,
};
