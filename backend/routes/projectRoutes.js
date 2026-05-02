const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/authMiddleware');
const ctrl = require('../controllers/projectController');

router.route('/').get(protect, ctrl.getProjects).post(protect, adminOnly, ctrl.createProject);
router.route('/:id').put(protect, adminOnly, ctrl.updateProject).delete(protect, adminOnly, ctrl.deleteProject);

module.exports = router;