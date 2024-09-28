
/* Services */
const wrap = require('http/error-handle').wrap;
const {createComplaint} = require('models/complaint.db');

module.exports = {
  createComplaintEndpoint: (req, res) => wrap({req, res}, createComplaintEndpoint, 'Complaint'),
};

async function createComplaintEndpoint({req, res}) {
  const complaint = await createComplaint(req.body);
  return res.send({complaint});
}
