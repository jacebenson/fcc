const express = require('express');
const http = require('http');
const path = require('path');
const router = express.Router();

const client_id = process.env.IMGUR_CLIENT_ID;

// SQLite setup
const Database = require('better-sqlite3');
const dbPath = process.env.SQLITE_PATH || path.join(__dirname, '..', 'data', 'fcc.db');
const fs = require('fs');

// Ensure data directory exists
const dataDir = path.dirname(dbPath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(dbPath);

// Create table if not exists
db.exec(`
  CREATE TABLE IF NOT EXISTS imagesearches (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    query TEXT NOT NULL,
    created TEXT NOT NULL
  )
`);

function cleanOldSearches() {
  const dateString = new Date().toDateString();
  const stmt = db.prepare("DELETE FROM imagesearches WHERE created != ?");
  stmt.run(dateString);
}

function logSearch(term) {
  try {
    cleanOldSearches();
    const dateString = new Date().toDateString();
    const stmt = db.prepare("INSERT INTO imagesearches (query, created) VALUES (?, ?)");
    stmt.run(term, dateString);
  } catch (e) {
    console.error('Failed to log search:', e.message);
  }
}

// GET /api/imagesearch/query?term=cats&offset=1
router.get('/query', (req, res) => {
  const term = encodeURIComponent(req.query.term);
  const offset = parseInt(req.query.offset, 10) || 0;

  if (!term) {
    return res.json({ error: 'No term given.' });
  }

  const options = {
    host: 'api.imgur.com',
    port: 80,
    path: '/3/gallery/search/top/0.json?q=' + term + '&page=' + offset + '&q_size_px=med&window=all',
    headers: {
      Authorization: 'Client-Id ' + client_id
    }
  };

  http.get(options, (imgurRes) => {
    let body = '';
    imgurRes.on('data', (chunk) => { body += chunk; });
    imgurRes.on('end', () => {
      try {
        const bodyObj = JSON.parse(body);
        const items = bodyObj.data || [];
        const returnObj = [];

        for (let n = 0; n < items.length; n++) {
          if (items[n].is_album === false) {
            returnObj.push({
              url: items[n].link,
              snippet: items[n].title
            });
          }
        }

        if (returnObj.length === 0) {
          return res.json({ error: 'No Results found' });
        }

        // Log search to SQLite
        logSearch(term);

        if (req.query.html === 'true') {
          // HTML response for browser
          let content = '<style>.hide{display:none}</style>';
          content += '<script src="https://code.jquery.com/jquery-3.1.1.slim.min.js"></script>';
          content += '<script>function tgl(a,b){$("#" + a).toggleClass("hide");$("#" + b).toggleClass("hide")}</script>';
          content += '<a href="/api/imagesearch/query?term=' + term + '&html=true&offset=' + (offset - 1) + '">PAST PAGE</a><br/>';
          content += '<a href="/api/imagesearch/query?term=' + term + '&html=true&offset=' + (offset + 1) + '">NEXT PAGE</a><br/>';
          content += '<div class="photos">';
          for (let x = 0; x < returnObj.length; x++) {
            content += '\n<a href="#" onclick="tgl(\''+(x)+'\',\''+(x+1)+'\')">';
            if (x === 0) {
              content += '\n<img class="" id="' + x + '" src="' + returnObj[x].url + '" alt="' + returnObj[x].snippet + '"><br/>\n';
            } else {
              content += '\n<img class="hide" id="' + x + '" src="' + returnObj[x].url + '" alt="' + returnObj[x].snippet + '"><br/>\n';
            }
            content += '\n</a>';
          }
          content += '</div>';
          res.set('Content-Type', 'text/html');
          res.send(content);
        } else {
          res.set('Content-Type', 'application/json');
          res.json(returnObj);
        }
      } catch (e) {
        res.status(500).json({ error: e.message });
      }
    });
  }).on('error', (e) => {
    res.status(500).json({ error: e.message });
  });
});

// GET /api/imagesearch/history
router.get('/history', (req, res) => {
  try {
    const stmt = db.prepare("SELECT * FROM imagesearches ORDER BY id DESC LIMIT 50");
    const docs = stmt.all();
    
    if (!docs || docs.length === 0) {
      res.json({ message: 'No recent queries.' });
    } else {
      // Format to match old MongoDB structure
      const formatted = docs.map(d => ({
        _id: d.id.toString(),
        query: d.query,
        created: d.created
      }));
      res.json(formatted);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
