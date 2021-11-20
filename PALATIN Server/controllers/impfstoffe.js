const asyncHandler = require('express-async-handler');
const model = require('../model/impfstoffe');

const getImpfstoffe = asyncHandler(async (req, res) => {
  res.status(200).json(await model.getImpfstoffe());
});

const postImpfstoff = asyncHandler(async (req, res) => {
  const { impfstoffname, zulassungsnummer, hersteller, einsatzzweck } =
    req.body;
  if (!impfstoffname || !zulassungsnummer || !hersteller || !einsatzzweck) {
    res.status(400).send('One or more properties missing.');
    return;
  }
  const rows = await model.getImpfstoffe();
  const zulassungsnummern = rows.map((el) => el.zulassungsnummer);
  if (zulassungsnummern.includes(zulassungsnummer)) {
    res.status(500).send('Impfstoff aleady exists.');
  } else res.status(200).json(await model.postImpfstoff(req.body));
});

const deleteImpfstoff = asyncHandler(async (req, res) => {
  const { zulassungsnummer } = req.params;
  if (!zulassungsnummer) {
    res.status(400).send('Zulassungsnummer missing.');
    return;
  }
  const rows = await model.getImpfstoffe();
  const zulassungsnummern = rows.map((el) => el.zulassungsnummer);
  if (zulassungsnummern.includes(zulassungsnummer)) {
    res.status(200).json(await model.deleteImpfstoff(zulassungsnummer));
  } else res.status(404).send('Impfstoff not existing.');
});

module.exports = {
  getImpfstoffe,
  postImpfstoff,
  deleteImpfstoff,
};
