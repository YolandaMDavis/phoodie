var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Food',  new Schema({_id: String, refuse: String,ref_desc: String,fat_factor: String,
  n_factor: String,
  manufacname: String,
  shrt_desc: String,
  comname: String,
  long_desc: String,
  survey: String,
  sciname: String,
  pro_factor: String,
  cho_factor: String,
  fdgrp_cd: String
}), 'food'); 