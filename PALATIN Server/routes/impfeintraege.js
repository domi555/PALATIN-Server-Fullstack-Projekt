const express = require('express');
const {
  getImpfeintraege,
  postImpfeintrag,
  patchImpfeintrag,
  deleteImpfeintrag,
} = require('../controllers/impfeintraege');

const router = express.Router();

router.get('/impfeintraege', getImpfeintraege);
router.post('/impfeintraege', postImpfeintrag);
router.patch('/impfeintraege/:id', patchImpfeintrag);
router.delete('/impfeintraege/:id', deleteImpfeintrag);

module.exports = router;
