const mongoose = require("mongoose");
const { databaseMessage } = require("../constants");

module.exports.formatMongoData = (data) => {
  if (Array.isArray(data)) {
    let formatedList = [];
    for (value of data) formatedList.push(value.toObject());
    return formatedList;
  }
  return data.toObject();
};

module.exports.checkObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id))
    throw new Error(databaseMessage.INVALID_ID);
};
