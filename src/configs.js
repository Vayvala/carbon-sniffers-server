
module.exports = {
  SERVER_PORT: process.env.PORT || 5454,
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  DB_URI: 'mongodb+srv://mvayvala:8WqSvWYYWj3LArjM@hackyeah.2o9vk.mongodb.net/dev?retryWrites=true&w=majority',
  get ENV() {
    return process.env.NODE_ENV || 'development';
  },
};
