import db from "../models/index";
const createNewRoles = async (roles) => {
  try {
    let currentRoles = await db.Role.findAll({
      attributes: ["url", "description"],
      raw: true,
    });
    const persists = roles.filter(
      ({ url: url1 }) => !currentRoles.some(({ url: url2 }) => url1 === url2)
    );
    if (persists.length === 0) {
      return {
        EM: "Nothing to create ...",
        EC: 0,
        DT: [],
      };
    } else {
      console.log("check persist", persists);
      await db.Role.bulkCreate(persists);
      return {
        EM: `Create roles succeeds: ${persists.length} roles...`,
        EC: 0,
        DT: [],
      };
    }
  } catch (e) {
    console.log(e);
    return {
      EM: "something wrong with service",
      EC: 1,
      DT: [],
    };
  }
};
const getAllRoles = async () => {
  try {
    let data = await db.Role.findAll({
      order: [["id", "DESC"]],
    });
    // console.log(data);
    return {
      EM: "Get all roles succeed",
      EC: 0,
      DT: data,
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "something wrong with service",
      EC: 1,
      DT: [],
    };
  }
};
const deleteRole = async (id) => {
  try {
    let role = await db.Role.findOne({
      where: { id: id },
    });
    // let data = await db.Role.delete({
    //   where: { id: id },
    // });
    if (role) {
      await role.destroy();
    }
    return {
      EM: "Delete role succeed",
      EC: 0,
      DT: [],
    };
  } catch (e) {
    console.log(e);
    return {
      EM: "something wrong with service",
      EC: 1,
      DT: [],
    };
  }
};
module.exports = {
  createNewRoles,
  getAllRoles,
  deleteRole,
};
