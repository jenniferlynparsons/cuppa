export default function teaNormalizer(rawTeaData) {
  return {
    id: rawTeaData.id,
    name: rawTeaData.name,
    brand: rawTeaData.brand,
    teaType: rawTeaData.teaType,
    servings: rawTeaData.servings
  };
}