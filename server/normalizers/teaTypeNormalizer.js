const teaTypeNormalizer = rawTeaTypeData => {
  return {
    id: rawTeaTypeData.id,
    name: rawTeaTypeData.name,
    brewTime: rawTeaTypeData.brewTime
  };
};

module.exports = teaTypeNormalizer;
