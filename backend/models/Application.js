const mongoose = require('mongoose');

const applicationSchema = mongoose.Schema({
  opportunityId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Opportunity'
  },
  applicantName: {
    type: String,
    required: true,
  },
  applicantEmail: {
    type: String,
    required: true,
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
