var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('FoodNutrition',  new Schema({
  _id: [Schema.Types.ObjectId],
  nutr_val: String,
  num_data_pts: String,
  nutr_no: String,
  std_error: String,
  deriv_cd: String,
  ndb_no: String,
  src_cd: String,
  add_nutr_mark: String
}), 'food_nutrition'); 