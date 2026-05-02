const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/authMiddleware');
const ctrl = require('../controllers/taskController');

router.get('/dashboard', protect, ctrl.getDashboard);
router.route('/').get(protect, ctrl.getTasks).post(protect, adminOnly, ctrl.createTask);
router.route('/:id').put(protect, ctrl.updateTask).delete(protect, adminOnly, ctrl.deleteTask);

module.exports = router;