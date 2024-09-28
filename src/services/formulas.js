
const {homeTypes, transportTypes} = require('models/user.db');

/* Consumptions averages */
const KG_OF_WASTE_MONTH = 25;
const KWH_APT_MONTH = 450;
const KWH_HOUSE_MONTH = 950;
const KWH_CAR_1h = 31;
const KWH_EV_CAR_1h = 17;
/* CO2 conversion */
const CO2_PER_KWH = 666;
const CO2_PER_KG_WASTE = 0.5;

module.exports = {

};

function calculateEmissions({homeType, carType}) {
  const wasteEmissions = KG_OF_WASTE_MONTH * CO2_PER_KG_WASTE;
  const electricityEmissions = KWH_APT_MONTH * CO2_PER_KWH;
}
