const UserModel = require("../models/userModel");
const { formatMongoData, checkObjectId } = require("../helpers/dbHelper");
const { userMessage } = require("../constants");
const bcrypt = require("bcrypt");

module.exports.signup = async ({ email, password }) => {
    const userExists = await UserModel.findOne({ email });
    if (userExists) throw new Error(userMessage.DUPLICATE_EMAIL);
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new UserModel({ email, hashedPassword });
    const savedUser = await newUser.save();
    return formatMongoData(savedUser);
};
