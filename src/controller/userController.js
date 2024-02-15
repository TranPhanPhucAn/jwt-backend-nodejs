import userApiService from "../service/userApiService";
const readFunc = async (req, res) => {
  try {
    if (req.query.page && req.query.limit) {
      let page = req.query.page;
      let limit = req.query.limit;
      let data = await userApiService.getUserWithPagination(+page, +limit);
      res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } else {
      let data = await userApiService.getAllUser();
      res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: "",
    });
  }
};
const createFunc = async (req, res) => {
  try {
    await userApiService.createNewUser(req.body);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: "",
    });
  }
};
const updateFunc = async (req, res) => {
  try {
    await userApiService.createNewUser(req.body);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      EM: "error from server",
      EC: "-1",
      DT: "",
    });
  }
};
const deleteFunc = (req, res) => {};
module.exports = {
  readFunc,
  createFunc,
  updateFunc,
  deleteFunc,
};
