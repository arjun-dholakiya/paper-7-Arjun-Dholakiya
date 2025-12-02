const category = require("../../../models/category");
const categoryServices = require("../services/categoryServices");

exports.addCategory = async (req,res) => {
  
    try {
        const category = await categoryServices.addCategory(req.body);
        res.status(201).json({
            message:"Category Added Succesfully",
            category
        })
    } catch (error) {
        res.status(401).json({error:error.message})
    }
}
