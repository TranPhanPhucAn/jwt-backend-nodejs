import express from "express";
import apiController from "../controller/apiController";
import userController from "../controller/userController";
import groupController from "../controller/groupController";
import roleController from "../controller/roleController";
import { checkUserJWT, checkUserPermission } from "../middleware/JWTAction";
const router = express.Router();
const testMiddleware = (req, res, next) => {
  console.log("test md");
  next();
};
const checkUser = (req, res, next) => {
  const nonSecurePaths = ["/register", "/login"];
  if (nonSecurePaths.includes(req.path)) return next();
  if (user) {
    next();
  } else {
  }
};
const initApiRoutes = (app) => {
  router.all("*", checkUserJWT, checkUserPermission);
  router.get("/api/t");
  router.post("/register", apiController.handleRegister);
  router.post("/login", apiController.handleLogin);
  router.post("/logout", apiController.handleLogout);
  router.get("/account", userController.getUserAccount);
  //user routes
  router.get("/user/read", userController.readFunc);
  router.post("/user/create", userController.createFunc);
  router.put("/user/update", userController.updateFunc);
  router.delete("/user/delete", userController.deleteFunc);

  //roles route
  router.get("/role/read", roleController.readFunc);
  router.post("/role/create", roleController.createFunc);
  // router.put("/role/update", roleController.updateFunc);
  router.delete("/role/delete", roleController.deleteFunc);
  //group routes
  router.get("/group/read", groupController.readFunc);

  return app.use("/api/", router);
};
export default initApiRoutes;
