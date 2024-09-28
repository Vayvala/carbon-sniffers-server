
/* Services */
const wrap = require('http/error-handle').wrap;
const {createUser} = require('models/user.db');

module.exports = {
  createUserEndpoint: (req, res) => wrap({req, res}, createUserEndpoint, 'User'),
};

async function createUserEndpoint({req, res}) {
  const user = await createUser(req.body || {});
  return res.send({user});
}
