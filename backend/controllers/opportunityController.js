const Opportunity = require('../models/Opportunity');

// @desc    Get all opportunities
// @route   GET /api/opportunities
const getOpportunities = async (req, res) => {
  try {
    const { search, domain } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
      ];
    }

    if (domain && domain !== 'All') {
      query.domain = domain;
    }

    const opportunities = await Opportunity.find(query).sort({ createdAt: -1 });
    res.json(opportunities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single opportunity
// @route   GET /api/opportunities/:id
const getOpportunityById = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);
    if (opportunity) {
      res.json(opportunity);
    } else {
      res.status(404).json({ message: 'Opportunity not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create an opportunity
// @route   POST /api/opportunities
const createOpportunity = async (req, res) => {
  try {
    const { title, company, domain, location, experience, description, applicationLink } = req.body;

    const opportunity = new Opportunity({
      title,
      company,
      domain,
      location,
      experience,
      description,
      applicationLink,
    });

    const createdOpportunity = await opportunity.save();
    res.status(201).json(createdOpportunity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update an opportunity
// @route   PUT /api/opportunities/:id
const updateOpportunity = async (req, res) => {
  try {
    const { title, company, domain, location, experience, description, applicationLink } = req.body;

    const opportunity = await Opportunity.findById(req.params.id);

    if (opportunity) {
      opportunity.title = title || opportunity.title;
      opportunity.company = company || opportunity.company;
      opportunity.domain = domain || opportunity.domain;
      opportunity.location = location || opportunity.location;
      opportunity.experience = experience || opportunity.experience;
      opportunity.description = description || opportunity.description;
      opportunity.applicationLink = applicationLink || opportunity.applicationLink;

      const updatedOpportunity = await opportunity.save();
      res.json(updatedOpportunity);
    } else {
      res.status(404).json({ message: 'Opportunity not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete an opportunity
// @route   DELETE /api/opportunities/:id
const deleteOpportunity = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);

    if (opportunity) {
      await opportunity.deleteOne();
      res.json({ message: 'Opportunity removed' });
    } else {
      res.status(404).json({ message: 'Opportunity not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getOpportunities,
  getOpportunityById,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity,
};
