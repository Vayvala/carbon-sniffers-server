
const {homeTypes, transportTypes} = require('models/user.db');

const KG_OF_WASTE_MONTH = 25;
const TREE_ABSORPTION_MONTH = 1.83;
/* CO2 conversion */
const CO2_PER_KWH = 666;
const CO2_PER_KG_WASTE = 0.5;

module.exports = {
  calculateEmissions,
  calculateTreeQuota,
};

function calculateEmissions({homeType, transportType, carHoursPerDay}) {
  const homeKwh = homeTypes.find(_ => _.name === homeType).kwh;
  const carKwh = transportTypes.find(_ => _.name === transportType).kwh;
  const wasteEmissions = KG_OF_WASTE_MONTH * CO2_PER_KG_WASTE;
  const electricityEmissions = homeKwh * CO2_PER_KWH / 1000;
  const transportEmissions = carKwh * CO2_PER_KWH * carHoursPerDay * 30 / 1000;

  return wasteEmissions + electricityEmissions + transportEmissions;
}

function calculateTreeQuota(emissions) {
  return Math.ceil(emissions / TREE_ABSORPTION_MONTH);
}
