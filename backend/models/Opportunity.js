const mongoose = require('mongoose');

const opportunitySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    domain: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    applicationLink: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Opportunity = mongoose.model('Opportunity', opportunitySchema);

module.exports = Opportunity;
