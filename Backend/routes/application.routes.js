
const express = require('express');
const {getAppliedJob, getApplicants, updateStatus, applyJob} = require('../Controllers/application.controller');
const isAuthenticated = require('../middlewares/authmiddleware');

const router = express.Router();

router.route('/apply/:id').post(isAuthenticated, applyJob);
router.route('/get').get(isAuthenticated, getAppliedJob);
router.route('/:id/applicants').get(isAuthenticated, getApplicants);
router.route('/status/:id/update').put(isAuthenticated, updateStatus);

module.exports = router;