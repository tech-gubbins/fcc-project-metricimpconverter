'use strict';
const express = require('express');
const router = express.Router();
const ConvertHandler = require('../controllers/convertHandler.js');
const convertHandler = new ConvertHandler();

router.get('/convert', (req, res) => {
  const input = req.query.input;
  if (!input) {
    return res.status(400).json({ error: 'no input' });
  }

  const initNum = convertHandler.getNum(input);
  const initUnit = convertHandler.getUnit(input);

  if (initNum === 'invalid number' && initUnit === 'invalid unit') {
    return res.status(200).json({ error: 'invalid number and unit' });
  }
  if (initNum === 'invalid number') {
    return res.status(200).json({ error: 'invalid number' });
  }
  if (initUnit === 'invalid unit') {
    return res.status(200).json({ error: 'invalid unit' });
  }

  const returnNum = convertHandler.convert(initNum, initUnit);
  const returnUnit = convertHandler.getReturnUnit(initUnit);

  const initUnitString = convertHandler.spellOutUnit(initUnit);
  const returnUnitString = convertHandler.spellOutUnit(returnUnit);

  res.status(200).json({
    initNum,
    initUnit,
    returnNum,
    returnUnit,
    string: `${initNum} ${initUnitString} converts to ${returnNum} ${returnUnitString}`,
  });
});

module.exports = router;