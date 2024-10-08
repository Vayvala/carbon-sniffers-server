
/* NPM modules */
const {Schema, model} = require('mongoose');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');

/* Constants */
const {USERS} = require('models/collection-names');
const COLLECTION_NAME = USERS;
const homeTypes = [{
  name: 'apartment',
  kwh: 450,
}, {
  name: 'house',
  kwh: 950,
}];
const transportTypes = [{
  name: 'car',
  kwh: 31,
}, {
  name: 'ev',
  kwh: 17,
}, {
  name: 'public',
  kwh: 0,
}];

const schema = new Schema({
  deviceId: {type: String, required: true},
  homeType: {type: String, required: true},
  transportType: {type: String, required: true},
  carHoursPerDay: {type: Number, required: true},
},{
  strict: 'throw',
});
schema.plugin(mongooseLeanVirtuals);
const UserModel = model(COLLECTION_NAME, schema);

/**
 * Create a new user
 * @param {*} params
 * @param {string} params.deviceId The device ID
 * @param {string} params.homeType The home type
 * @param {string} params.transportType The transport type
 * @param {number} params.carHoursPerDay The car hours per day
 * @returns {Promise}
 */
async function createUser({deviceId, homeType, transportType, carHoursPerDay}) {
  if (!deviceId) throw new Error('Missing deviceId');
  if (!homeTypes.map(_ => _.name).includes(homeType)) {
    throw new Error(`Invalid homeType: ${homeType}`);
  }
  if (!transportTypes.map(_ => _.name).includes(transportType)) {
    throw new Error(`Invalid transportTypes: ${homeType}`);
  }
  if (carHoursPerDay && isNaN(Number(carHoursPerDay))) throw new Error(`Invalid carHoursPerDay: ${carHoursPerDay}`);
  const newUser = await UserModel.create({
    deviceId,
    homeType,
    transportType,
    carHoursPerDay: Number(carHoursPerDay) || 0,
  });
  return newUser;
}

module.exports = {
  homeTypes,
  transportTypes,
  UserModel,
  createUser,
};
