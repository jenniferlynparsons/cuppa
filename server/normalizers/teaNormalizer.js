const teaNormalizer = rawTeaData => {
  return {
    id: rawTeaData.id,
    name: rawTeaData.name,
    brand: rawTeaData.brand,
    teaType: rawTeaData.teaType,
    servings: rawTeaData.servings,
    rating: rawTeaData.rating
  };
};

module.exports = teaNormalizer;
