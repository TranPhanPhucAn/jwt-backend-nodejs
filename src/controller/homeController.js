import userService from "../service/userService";
let handleHello = (req, res) => {
  return res.render("home.ejs");
};
let handleUser = async (req, res) => {
  let userList = await userService.getUserList();
  return res.render("user.ejs", { userList });
};
let handleCreateNewUser = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  let username = req.body.username;
  await userService.createNewUser(email, password, username);
  return res.redirect("/user");
};
let handleDeleteUser = async (req, res) => {
  await userService.deleteUser(req.params.id);
  return res.redirect("/user");
};
let getUpdateUserPage = async (req, res) => {
  let id = req.params.id;
  let user = await userService.getUserById(id);
  let userData = {};
  if (user && user.length > 0) {
    userData = user[0];
  }
  return res.render("user-update.ejs", { userData });
};
let handleUpdateUser = async (req, res) => {
  let { email, username, id } = req.body;
  await userService.updateUserInfor(email, username, id);
  return res.redirect("/user");
};
module.exports = {
  handleHello,
  handleUser,
  handleCreateNewUser,
  handleDeleteUser,
  getUpdateUserPage,
  handleUpdateUser,
};
