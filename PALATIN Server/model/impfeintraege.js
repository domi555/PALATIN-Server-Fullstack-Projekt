const db = require('../db');

const getImpfeintraege = async () => {
  const { rows } = await db.query(
    'SELECT id, impfstoffname, zulassungsnummer as impfstoffzulassungsnummer, hersteller, einsatzzweck, chargennummer, impfdatum, patienteninfo from impfeintraege JOIN impfstoffe ON impfeintraege.impfstoff_zulassungsnummer = impfstoffe.zulassungsnummer',
  );
  return rows;
};

const postImpfeintrag = async (impfeintrag) => {
  // id: auto increment
  // impfdatum -> default: timestamp at insert
  const { rows } = await db.query(
    'INSERT INTO impfeintraege (chargennummer, patienteninfo, impfstoff_zulassungsnummer) VALUES($1, $2, $3) RETURNING id',
    [
      impfeintrag.chargennummer,
      impfeintrag.patienteninfo,
      impfeintrag.impfstoffzulassungsnummer,
    ],
  );
  return rows[0];
};

const patchImpfeintrag = async (id, object) => {
  // possible object properties: chargennummer, impfdatum, patienteninfo, impfstoff_zulassungsnummer
  const update = [];
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      update.push(`${key} = '${object[key]}'`);
    }
  }
  const cmd = `UPDATE impfeintraege SET ${update.join(
    ', ',
  )} WHERE id = $1 RETURNING id`;
  const { rows } = await db.query(cmd, [id]);
  return rows[0];
};

const deleteImpfeintrag = async (id) => {
  const { rows } = await db.query('DELETE FROM impfeintraege WHERE id = $1 RETURNING id', [
    id,
  ]);
  return rows[0];
};

module.exports = {
  getImpfeintraege,
  postImpfeintrag,
  patchImpfeintrag,
  deleteImpfeintrag,
};
