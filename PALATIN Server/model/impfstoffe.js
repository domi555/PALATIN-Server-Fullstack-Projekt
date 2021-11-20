const db = require('../db');

const getImpfstoffe = async () => {
  const { rows } = await db.query('SELECT * from impfstoffe');
  return rows;
};

const postImpfstoff = async (impfstoff) => {
  const { rows } = await db.query(
    'INSERT INTO impfstoffe (impfstoffname, zulassungsnummer, hersteller, einsatzzweck) VALUES($1, $2, $3, $4) RETURNING zulassungsnummer',
    [
      impfstoff.impfstoffname,
      impfstoff.zulassungsnummer,
      impfstoff.hersteller,
      impfstoff.einsatzzweck,
    ],
  );
  return rows[0];
};

const deleteImpfstoff = async (zulassungsnummer) => {
  const { rows } = await db.query(
    'DELETE FROM impfstoffe WHERE zulassungsnummer = $1 RETURNING zulassungsnummer',
    [zulassungsnummer],
  );
  return rows[0];
};

module.exports = {
  getImpfstoffe,
  postImpfstoff,
  deleteImpfstoff,
};
