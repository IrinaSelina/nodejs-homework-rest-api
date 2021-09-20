const register = require("./register");
const login = require("./login");
const logout = require("./logout");
const currentUser = require("./getCurrentUser");
const updateAvatar = require("./updateAvatar");
const verify = require("./verify");
const repeatVerifycation = require("./repeatVerifycation");
module.exports = {
  login,
  register,
  logout,
  currentUser,
  updateAvatar,
  verify,
  repeatVerifycation,
};
