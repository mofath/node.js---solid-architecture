module.exports.formatMongoData = (data) => {
  if (Array.isArray(data)) {
    let formatedList = [];
    for (value of data) formatedList.push(value.toObject());
    return formatedList;
  }
  return data.toObject();
};
