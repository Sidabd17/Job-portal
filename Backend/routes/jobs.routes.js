
const express = require('express');
const { postJob, getAllJobs, getJobById, getAdminJobs } = require('../Controllers/job.controller');
const isAuthenticated = require('../middlewares/authmiddleware');

const router = express.Router();

router.route('/post').post(isAuthenticated, postJob);
router.route('/get').get(isAuthenticated,getAllJobs);
router.route('/getadminjobs').get(isAuthenticated, getAdminJobs);
router.route('/get/:id').get(isAuthenticated, getJobById);

module.exports = router;
 