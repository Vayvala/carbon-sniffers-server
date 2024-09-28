
/* NPM modules */
const mongoose = require('mongoose');
// mongoose.set('debug', true)

/* Constants */
const {DB_URI} = require('configs');

const __setOptions = mongoose.Query.prototype.setOptions;
mongoose.Query.prototype.setOptions = function (options, overwrite) {
  __setOptions.apply(this, arguments);
  if (this.options.lean == null) this.mongooseOptions({ lean: { virtuals: true } });
  return this;
};

mongoose.plugin(schema => {
  schema.pre('findOneAndUpdate', function () {
    if (!('new' in this.options)) {
      this.setOptions({ new: true });
    }
  });
});

module.exports = function() {
  main().catch(err => console.log(`Error connecting to MongoDB: ${err}`));

  async function main() {
    // http://mongoosejs.com/docs/index.html
    console.log('Connecting to MongoDB...');
    await mongoose.connect(DB_URI);
    const admin = new mongoose.mongo.Admin(mongoose.connection.db);
    const info = await admin.buildInfo();
    const separator = '='.repeat(120);
    console.log(separator);
    console.log(`MongoDB version ${info.version} connected!`);
    console.log(_maskConnectionString(DB_URI));
    console.log(separator);
  }
};

/**
 * @param {string} str
 * @returns {string}
 */
function _maskConnectionString(str) {
  // Find the index of the first occurrence of "://"
  const protocolIndex = str.indexOf("://");
  // Find the index of the next occurrence of "@"
  const atIndex = str.indexOf("@");
  // Extract the part before "://" and after "@"
  const protocolPart = str.substring(0, protocolIndex + 3);
  const remainingPart = str.substring(atIndex);
  // Construct the masked connection string
  const result = protocolPart + "********" + remainingPart;
  return result;
}
