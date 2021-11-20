const asyncHandler = require('express-async-handler');
const model = require('../model/impfeintraege');
const { getImpfstoffe } = require('../model/impfstoffe');

const getImpfeintraege = asyncHandler(async (req, res) => {
  res.status(200).json(await model.getImpfeintraege());
});

const postImpfeintrag = asyncHandler(async (req, res) => {
  const { chargennummer, patienteninfo, impfstoffzulassungsnummer } = req.body;
  if (!chargennummer || !patienteninfo || !impfstoffzulassungsnummer) {
    res.status(400).send('One or more properties missing.');
    return;
  }
  const rows = await getImpfstoffe();
  const impfstoffe = rows.map((el) => el.zulassungsnummer);
  if (impfstoffe.includes(impfstoffzulassungsnummer)) {
    res.status(200).json(await model.postImpfeintrag(req.body));
  } else res.status(404).send('Impfstoffzulassungsnummer not existing.');
});

const patchImpfeintrag = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).send('Id missing.');
    return;
  }
  const rows = await model.getImpfeintraege();
  const impfeintraege = rows.map((el) => el.id);
  if (impfeintraege.includes(Number(id))) {
    res.status(200).json(await model.patchImpfeintrag(id, req.body));
  } else res.status(404).send('Impfeintrag not existing.');
});

const deleteImpfeintrag = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400).send('Id missing.');
    return;
  }
  const rows = await model.getImpfeintraege();
  const impfeintraege = rows.map((el) => el.id);
  if (impfeintraege.includes(Number(id))) {
    res.status(200).json(await model.deleteImpfeintrag(id));
  } else res.status(404).send('Impfeintrag not existing.');
});

module.exports = {
  getImpfeintraege,
  postImpfeintrag,
  patchImpfeintrag,
  deleteImpfeintrag,
};
