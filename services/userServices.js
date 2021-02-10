const UserModel = require("../models/userModel");
const { formatMongoData } = require("../helpers/dbHelper");
const { userMessage } = require("../constants");
var bcrypt = require('bcryptjs');

module.exports.signup = async ({ email, password }) => {
  const userExists = await UserModel.findOne({ email });
  if (userExists) throw new Error(userMessage.DUPLICATE_EMAIL);
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({ email, hashedPassword });
  const savedUser = await newUser.save();
  return formatMongoData(savedUser);
};

module.exports.login = async ({ email, password }) => {
  try {
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error(userMessage.USER_NOT_FOUND);
    console.log(user);
    const isValid = await bcrypt.compareSync(password, user.password);
    if (!isValid) throw new Error(userMessage.INVALID_PASSWORD);

    const token = jwt.sign({ id: user._id }, "my-secret-key", { expiresIn: "1d" });
    return { token };
  } catch (error) {
    console.log("Something went wrong: Service: login", error);
    throw new Error(error);
  }
};
