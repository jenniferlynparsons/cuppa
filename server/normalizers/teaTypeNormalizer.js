const teaTypeNormalizer = rawTeaTypeData => {
  return {
    id: rawTeaTypeData.id,
    userID: rawTeaTypeData.userID,
    globalID: rawTeaTypeData.globalID,
    name: rawTeaTypeData.name,
    brewTime: rawTeaTypeData.brewTime,
    visible: rawTeaTypeData.visible
  };
};

module.exports = teaTypeNormalizer;
