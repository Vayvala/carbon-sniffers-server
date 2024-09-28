
/* Services */
const wrap = require('http/error-handle').wrap;
const {createUser, UserModel} = require('models/user.db');
const {aggregateComplaintPoints} = require('models/complaint.db');
const {calculateEmissions, calculateTreeQuota} = require('services/emissions');

module.exports = {
  createUserEndpoint: (req, res) => wrap({req, res}, createUserEndpoint, 'User'),
  getUserEmissionsEndpoint: (req, res) => wrap({req, res}, getUserEmissionsEndpoint, 'User'),
};

async function createUserEndpoint({req, res}) {
  const user = await createUser(req.body);
  return res.send({user});
}

async function getUserEmissionsEndpoint({req, res}) {
  const {deviceId} = req.query;
  const user = await UserModel.findOne({deviceId});
  const emissions = calculateEmissions(user);
  const treeQuota = calculateTreeQuota(emissions);
  const complaintPoints = await aggregateComplaintPoints(deviceId);
  return res.send({emissions, treeQuota, complaintPoints});
}
