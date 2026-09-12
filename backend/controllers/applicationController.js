const Application = require('../models/Application');

// @desc    Submit an application
// @route   POST /api/applications
const createApplication = async (req, res) => {
  try {
    const { opportunityId, applicantName, applicantEmail } = req.body;

    const application = new Application({
      opportunityId,
      applicantName,
      applicantEmail,
    });

    const createdApplication = await application.save();
    res.status(201).json(createdApplication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all applications
// @route   GET /api/applications
const getApplications = async (req, res) => {
  try {
    // Populate the opportunity details along with the application
    const applications = await Application.find().populate('opportunityId', 'title company').sort({ appliedAt: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createApplication,
  getApplications,
};
