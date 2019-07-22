const teaTypeNormalizer = rawTeaTypeData => {
  return {
    id: rawTeaTypeData.id,
    userID: rawTeaTypeData.userID,
    name: rawTeaTypeData.name,
    brewTime: rawTeaTypeData.brewTime
  };
};

module.exports = teaTypeNormalizer;
