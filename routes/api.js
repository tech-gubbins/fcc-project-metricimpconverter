'use strict';
const express = require('express');
const router = express.Router();
const ConvertHandler = require('../controllers/convertHandler.js');

router.get('/convert', (req, res) => {
  const input = req.query.input;
  const initNum = ConvertHandler.getNum(input);
  const initUnit = ConvertHandler.getUnit(input);

  if (initNum === 'invalid number' && initUnit === 'invalid unit') {
    return res.json('invalid number and unit');
  } else if (initNum === 'invalid number') {
    return res.json('invalid number'); 
  } else if (initUnit === 'invalid unit') {
    return res.json('invalid unit');
  }

  const returnNum = ConvertHandler.convert(initNum, initUnit);
  const returnUnit = ConvertHandler.getReturnUnit(initUnit);
  const initUnitString = ConvertHandler.spellOutUnit(initUnit);
  const returnUnitString = ConvertHandler.spellOutUnit(returnUnit);

  res.json({
    initNum,
    initUnit,
    returnNum,
    returnUnit,
    string: `${initNum} ${initUnitString} converts to ${returnNum} ${returnUnitString}`
  });
});

module.exports = router;