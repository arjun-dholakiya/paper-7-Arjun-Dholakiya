const Category =  require("../../../models/category");

exports.addCategory = async (data) => {

  const{
    name,
  } = data;

  const addCategory = Category.create({
    name
  });
  return addCategory;

}
