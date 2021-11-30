const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  dateOfBirth: {type: Date, required: true},
  dateOfAppointment: {type: Date, required: true},
  complaints: {type: String, required: true},
  doctor: {type: Types.ObjectId, ref: 'User'},
  userOwner: {type: Types.ObjectId, ref: 'User'}
});

module.exports = model('Talon', schema);
