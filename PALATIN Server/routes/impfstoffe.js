const express = require('express');
const {
  getImpfstoffe,
  postImpfstoff,
  deleteImpfstoff,
} = require('../controllers/impfstoffe');

const router = express.Router();

router.get('/impfstoffe', getImpfstoffe);
router.post('/impfstoffe', postImpfstoff);
router.delete('/impfstoffe/:zulassungsnummer', deleteImpfstoff);

module.exports = router;
