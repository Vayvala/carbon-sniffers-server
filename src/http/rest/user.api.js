
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
  const co2Monthly = Math.round(calculateEmissions(user));
  const co2Yearly = Math.round(calculateEmissions(user) * 12);
  const co2Weekly = Math.round(calculateEmissions(user) / 4);
  const treeQuota = calculateTreeQuota(co2Monthly);
  const complaintPoints = await aggregateComplaintPoints(deviceId);
  return res.send({
    co2Weekly,
    co2Monthly,
    co2Yearly,
    treeQuota,
    complaintPoints,
  });
}
