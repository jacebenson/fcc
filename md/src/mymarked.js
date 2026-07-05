// Create reference instance
console.log('loaded mymarked');
var myMarked = require('marked');

// Get reference
var renderer = new myMarked.Renderer();

// Override function
renderer.heading = function (text, level) {
  var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

  return `
          <h${level}>TEST
            <a name="${escapedText}" class="anchor" href="#${escapedText}">
              <span class="header-link"></span>
            </a>AHA!
            ${text}
          </h${level}>`;
};