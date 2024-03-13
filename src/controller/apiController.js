import loginRegisterService from "../service/loginRegisterService";
const handleRegister = async (req, res) => {
  try {
    let { email, phone, password } = req.body;
    if (!email || !phone || !password) {
      return res.status(200).json({
        EM: "Missing required parameter", //error message
        EC: 1, //error code
        DT: "", //date
      });
    }
    if (req.body.password && req.body.password.length < 4) {
      return res.status(200).json({
        EM: "Your password must have more 4 character", //error message
        EC: -3, //error code
        DT: "", //date
      });
    }
    let data = await loginRegisterService.registerNewUser(req.body);
    return res.status(200).json({
      EM: data.EM, //error message
      EC: data.EC, //error code
      DT: "", //date
    });
  } catch (e) {
    return res.status(500).json({
      EM: "error from server", //error message
      EC: -1, //error code
      DT: "", //date
    });
  }
};
let handleLogin = async (req, res) => {
  try {
    let data = await loginRegisterService.handleUserLogin(req.body);
    //set cookies
    if (data && data.DT && data.DT.access_token) {
      res.cookie("jwt", data.DT.access_token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
      });
    }

    return res.status(200).json({
      EM: data.EM, //error message
      EC: data.EC, //error code
      DT: data.DT, //date
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EM: "error from server", //error message
      EC: -1, //error code
      DT: "", //date
    });
  }
};
const handleLogout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    return res.status(200).json({
      EM: "Clear cookies done!", //error message
      EC: 0, //error code
      DT: "", //date
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EM: "error from server", //error message
      EC: -1, //error code
      DT: "", //date
    });
  }
};
module.exports = {
  handleRegister,
  handleLogin,
  handleLogout,
};
