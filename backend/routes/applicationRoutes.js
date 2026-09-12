const express = require('express');
const router = express.Router();
const { createApplication, getApplications } = require('../controllers/applicationController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(protect, admin, getApplications).post(protect, createApplication);

module.exports = router;
