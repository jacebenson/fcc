const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Load project registry
const projects = JSON.parse(fs.readFileSync('./projects.json', 'utf8'));

// Parse JSON bodies for APIs
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// ==================== API ROUTES ====================
// Microservices mounted at /api/*

// File metadata API (file upload size)
const metadataRoutes = require('./api/metadata');
app.use('/api/metadata', metadataRoutes);

// Header parser API
const headerparserRoutes = require('./api/headerparser');
app.use('/api/headerparser', headerparserRoutes);

// Image search API
const imagesearchRoutes = require('./api/imagesearch');
app.use('/api/imagesearch', imagesearchRoutes);

// Timestamp API
const timeRoutes = require('./api/time');
app.use('/api/time', timeRoutes);

// URL shortener API
const urlshortenerRoutes = require('./api/urlshortener');
app.use('/api/urlshortener', urlshortenerRoutes);

// ==================== STATIC PROJECTS ====================
// Each project served at its own subpath

const staticProjects = [
  { name: 'calc', path: 'calc/public' },
  { name: 'drum', path: 'drum/public' },
  { name: 'dungeon', path: 'dungeon/public' },
  { name: 'leaderboard', path: 'leaderboard/build' },
  { name: 'life', path: 'life/public' },
  { name: 'md', path: 'md/build' },
  { name: 'pomodoro', path: 'pomodoro/public' },
  { name: 'portfolio', path: 'portfolio/public' },
  { name: 'product', path: 'product/public' },
  { name: 'quotes', path: 'quotes/public' },
  { name: 'recipe', path: 'recipe/build' },
  { name: 'simon', path: 'simon/public' },
  { name: 'survey', path: 'survey/public' },
  { name: 'technical-docs', path: 'technical-docs/public' },
  { name: 'tictactoe', path: 'tictactoe/public' },
  { name: 'tribute', path: 'tribute/public' },
  { name: 'twitch', path: 'twitch/public' },
  { name: 'weather', path: 'weather/src' },  // Vite project, serves src
  { name: 'wiki', path: 'wiki/public' }
];

staticProjects.forEach(project => {
  const staticPath = path.join(__dirname, project.path);
  if (fs.existsSync(staticPath)) {
    app.use(`/${project.name}`, express.static(staticPath));
    // Serve index.html for root path
    app.get(`/${project.name}`, (req, res) => {
      const indexPath = path.join(staticPath, 'index.html');
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).send(`No index.html found in ${project.path}`);
      }
    });
    console.log(`✓ Mounted /${project.name} → ${project.path}`);
  } else {
    console.log(`✗ Skipped /${project.name} (path not found: ${project.path})`);
  }
});

// ==================== DASHBOARD ====================
// Root path shows project directory

app.get('/', (req, res) => {
  const projectCards = projects.map(p => `
    <div class="project-card">
      <h3><a href="/${p.slug}">${p.name}</a></h3>
      <p>${p.description || 'No description'}</p>
      <span class="tag">${p.type}</span>
    </div>
  `).join('');

  const apiCards = [
    { name: 'File Metadata', slug: 'api/metadata', desc: 'Upload files, get size', type: 'API' },
    { name: 'Header Parser', slug: 'api/headerparser', desc: 'Parse request headers', type: 'API' },
    { name: 'Image Search', slug: 'api/imagesearch', desc: 'Search Imgur images', type: 'API' },
    { name: 'Timestamp', slug: 'api/time', desc: 'Unix/natural date conversion', type: 'API' },
    { name: 'URL Shortener', slug: 'api/urlshortener', desc: 'Shorten URLs', type: 'API' }
  ].map(p => `
    <div class="project-card api">
      <h3><a href="/${p.slug}">${p.name}</a></h3>
      <p>${p.desc}</p>
      <span class="tag api">${p.type}</span>
    </div>
  `).join('');

  res.send(`
<!DOCTYPE html>
<html>
<head>
  <title>FCC Projects Dashboard</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #1a1a2e;
      color: #eee;
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    h1 { color: #00d4aa; margin-bottom: 0.5rem; }
    .subtitle { color: #888; margin-bottom: 2rem; }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
    }
    .project-card {
      background: #16213e;
      border-radius: 8px;
      padding: 1rem;
      border: 1px solid #0f3460;
      transition: transform 0.2s, border-color 0.2s;
    }
    .project-card:hover {
      transform: translateY(-2px);
      border-color: #00d4aa;
    }
    .project-card.api { background: #1a0f2e; border-color: #4a0f60; }
    .project-card h3 { margin-bottom: 0.5rem; }
    .project-card a { color: #00d4aa; text-decoration: none; }
    .project-card a:hover { text-decoration: underline; }
    .project-card p { color: #aaa; font-size: 0.9rem; margin-bottom: 0.5rem; }
    .tag {
      display: inline-block;
      background: #0f3460;
      color: #00d4aa;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      font-size: 0.75rem;
      text-transform: uppercase;
    }
    .tag.api { background: #4a0f60; color: #e74c3c; }
    h2 { color: #00d4aa; margin: 2rem 0 1rem; border-bottom: 2px solid #0f3460; padding-bottom: 0.5rem; }
  </style>
</head>
<body>
  <h1>FreeCodeCamp Projects</h1>
  <p class="subtitle">All projects consolidated to a single endpoint</p>

  <h2>APIs</h2>
  <div class="grid">${apiCards}</div>

  <h2>Static Projects</h2>
  <div class="grid">${projectCards}</div>
</body>
</html>
  `);
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`\n🚀 FCC Dashboard running on http://localhost:${PORT}`);
  console.log(`📁 Serving ${staticProjects.length} static projects`);
  console.log(`🔌 API endpoints at /api/*\n`);
});
