const sourceNormalizer = rawData => {
  return {
    id: rawData.id,
    userID: rawData.userID,
    globalID: rawData.globalID,
    name: rawData.name,
    visible: rawData.visible
  };
};

module.exports = sourceNormalizer;
