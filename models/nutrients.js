var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Nutrient',  new Schema({
  _id: String,
  num_dec: String,
  tagname: String,
  units: String,
  nutrdesc: String,
  sr_order: String
}), 'nutrients'); 