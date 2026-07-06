const express = require('express');
const useragent = require('useragent');
const acceptLanguageParser = require('accept-language-parser');

const router = express.Router();

router.get('/', (req, res) => {
  try {
    let languages = acceptLanguageParser.parse(req.headers['accept-language']);
    if (languages[0]) {
      languages = languages[0].code;
    } else {
      languages = 'unknown';
    }

    const agent = useragent.parse(req.headers['user-agent']);
    
    const returnObj = {
      language: languages,
      os: agent.os.toString(),
      browser: agent.toAgent(),
      ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress
    };

    res.setHeader('Content-Type', 'application/json');
    res.json(returnObj);
  } catch (error) {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
