
/* NPM modules */
const {Schema, model} = require('mongoose');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');

/* Constants */
const {COMPLAINTS} = require('models/collection-names');
const COLLECTION_NAME = COMPLAINTS;
const complaintTypes = [{
  name: 'old car',
  treeValue: 30,
}, {
  name: 'gas car in city',
  treeValue: 20,
}, {
  name: 'burning trash',
  treeValue: 50,
}];

const schema = new Schema({
  deviceId: {type: String, required: true},
  complaintType: {type: String, required: true},
  timestamp: {type: Date, required: true},
},{
  strict: 'throw',
});
schema.plugin(mongooseLeanVirtuals);
const ComplaintModel = model(COLLECTION_NAME, schema);

/**
 * Create a new complaint
 * @param {*} params
 * @param {string} params.deviceId The device ID
 * @param {string} params.complaintType The complaint type
 * @returns {Promise}
 */
async function createComplaint({deviceId, complaintType}) {
  if (!deviceId) throw new Error('Missing deviceId');
  if (!complaintTypes.map(_ => _.name).include(complaintType)) {
    throw new Error(`Invalid complainType: ${complaintType}`);
  }
  const newComplaint = await ComplaintModel.create({
    deviceId,
    complaintType,
    timestamp: new Date(),
  });
  return newComplaint;
}

module.exports = {
  ComplaintModel,
  complaintTypes,
  createComplaint,
};
