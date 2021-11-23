const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  speciality: {type: String, required: true}
});

module.exports = model('Doctor', schema);
