const db = require('../db/db');

const getAllSocias = () => {
  return db('socias').select('*');
};

const getSociaById = (id) => {
  return db('socias').where({ id }).first();
};

const createSocia = (socia) => {
  return db('socias').insert(socia).returning('*');
};

const updateSocia = (id, socia) => {
  return db('socias').where({ id }).update(socia).returning('*');
};

const deleteSocia = (id) => {
  return db('socias').where({ id }).del();
};

module.exports = {
  getAllSocias,
  getSociaById,
  createSocia,
  updateSocia,
  deleteSocia,
};
