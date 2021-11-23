const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  dateOfBirth: {type: Date, required: true},
  dateOfAppointment: {type: Date, required: true},
  doctor: {type: Types.ObjectId, ref: 'Doctor'},
  userOwner: {type: Types.ObjectId, ref: 'User'}
});

module.exports = model('Talon', schema);
