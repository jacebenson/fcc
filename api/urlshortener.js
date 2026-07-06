const express = require('express');
const validUrl = require('valid-url');
const path = require('path');
const router = express.Router();
const fs = require('fs');

// SQLite setup
const Database = require('better-sqlite3');
const dbPath = process.env.SQLITE_PATH || path.join(__dirname, '..', 'data', 'fcc.db');
const baseUrl = process.env.BASE_URL || 'http://localhost:3000/api/urlshortener/';

// Ensure data directory exists
const dataDir = path.dirname(dbPath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(dbPath);

// Create table if not exists
db.exec(`
  CREATE TABLE IF NOT EXISTS shorts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    original_url TEXT NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

function findByURL(requestedUrl, res) {
  requestedUrl = decodeURIComponent(requestedUrl);
  
  if (!validUrl.isWebUri(requestedUrl)) {
    return res.json({ error: "Not valid URL." });
  }

  try {
    // Check if URL already exists
    const findStmt = db.prepare("SELECT * FROM shorts WHERE original_url = ?");
    const existing = findStmt.get(requestedUrl);
    
    if (existing) {
      const result = {
        _id: existing.id.toString(),
        original_url: existing.original_url,
        id: existing.id,
        short_url: baseUrl + existing.id
      };
      return res.json(result);
    }
    
    // Insert new URL
    const insertStmt = db.prepare("INSERT INTO shorts (original_url) VALUES (?)");
    const info = insertStmt.run(requestedUrl);
    const newId = info.lastInsertRowid;
    
    const result = {
      _id: newId.toString(),
      original_url: requestedUrl,
      id: newId,
      short_url: baseUrl + newId
    };
    res.json(result);
    
  } catch (err) {
    res.json({ error: err.message });
  }
}

function findByID(input, res) {
  try {
    const id = parseInt(input, 10);
    if (isNaN(id)) {
      return res.json({ error: 'Invalid ID format.' });
    }
    
    const stmt = db.prepare("SELECT * FROM shorts WHERE id = ?");
    const item = stmt.get(id);
    
    if (item) {
      res.writeHead(302, { 'Location': item.original_url });
      res.end();
    } else {
      res.json({ error: 'Could not find record.' });
    }
  } catch (err) {
    res.json({ error: err.message });
  }
}

// GET /api/urlshortener/new/*
router.get('/new/*', (req, res) => {
  res.set('Content-Type', 'application/json');
  const requestedUrl = req.originalUrl.replace(/^\/api\/urlshortener\/new\//, '');
  findByURL(requestedUrl, res);
});

// GET /api/urlshortener/:num (redirect)
router.get('/:num', (req, res) => {
  findByID(req.params.num, res);
});

// GET /api/urlshortener/ (list all)
router.get('/', (req, res) => {
  try {
    const stmt = db.prepare("SELECT * FROM shorts ORDER BY id DESC LIMIT 100");
    const docs = stmt.all();
    
    const formatted = docs.map(d => ({
      _id: d.id.toString(),
      original_url: d.original_url,
      id: d.id,
      short_url: baseUrl + d.id,
      created_at: d.created_at
    }));
    
    res.json(formatted);
  } catch (err) {
    res.json({ error: err.message });
  }
});

module.exports = router;
