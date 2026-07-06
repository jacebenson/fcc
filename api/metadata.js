const express = require('express');
const multer = require('multer');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Serve the upload form
router.use(express.static('metadata/views'));

router.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'metadata/views' });
});

router.post('/', upload.single('uploadedFile'), (req, res) => {
  if (req.file) {
    res.json({ size: req.file.size });
  } else {
    res.json({ error: "It was not possible to upload the file, please try again." });
  }
});

module.exports = router;
