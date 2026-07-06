const express = require('express');
const router = express.Router();

function getTime(input) {
  const returnObj = {};
  if (input && input.length > 0) {
    if (isNaN(input)) {
      const d = new Date(decodeURIComponent(input));
      returnObj.unixTimeStamp = d.valueOf();
      returnObj.naturalLanguageDate = d.toDateString();
    } else {
      const d = new Date(parseInt(input, 10));
      returnObj.unixTimeStamp = d.valueOf();
      returnObj.naturalLanguageDate = d.toDateString();
    }
  }
  return returnObj;
}

// GET /api/time/timestamp/:input
router.get('/timestamp/:num', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const input = req.params.num;
  res.json(getTime(input));
});

// GET /api/time/
router.get('/', (req, res) => {
  res.json({
    unixTimeStamp: null,
    naturalLanguageDate: null
  });
});

module.exports = router;
