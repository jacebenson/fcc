import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//import 'https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js';
var marked = require('marked');
marked.setOptions({
  breaks: true,
});
var renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}` + '</a>';
}

class Marked extends React.Component {
  constructor(props) {
    super(props);
    this.mdValue = '';
    this.mdValue += '# How to make this pass a test\n';
    this.mdValue += 'So you are working on the new FCC Certificates?  **Me too!(bold)**\n'
    this.mdValue += '## Add the test CDN everywhere\n';
    this.mdValue += 'Really this is a pain but once you figrue it out, it is pretty neat.\n';
    this.mdValue += '![](https://media.giphy.com/media/pv4pdv90ugtTq/giphy.gif)\n\n'
    this.mdValue += 'Issues I had:\n';
    this.mdValue += '\n';
    this.mdValue += '  * Figuring out how to add the darn test for the [project](https://learn.freecodecamp.org/front-end-libraries/front-end-libraries-projects/build-a-markdown-previewer)\n';
    this.mdValue += '  * Updating the text to have all the appropriate elements on load :(\n';
    this.mdValue += '\n';
    this.mdValue += 'Required Elements:\n';
    this.mdValue += '\n';
    this.mdValue += '  1. H1 Header\n';
    this.mdValue += '  1. H2 Header\n';
    this.mdValue += '  1. Link\n';
    this.mdValue += '  1. Inline Code like this `console.log("Really?");`\n';
    this.mdValue += '  1. Code Block (see below)\n';
    this.mdValue += '  1. Block Quote\n';
    this.mdValue += '  1. Image\n';
    this.mdValue += '  1. Bold Text\n';
    this.mdValue += '\n';
    this.mdValue += '### Code Block\n'
    this.mdValue += '```js\n';
    this.mdValue += 'console.log("test");\n';
    this.mdValue += '```\n';
    this.mdValue += '### Quote\n';
    this.mdValue += '> Just Do It - Nike\n'
    this.htmlValue = '';
    // This binding is necessary to make `this` work in the callback
    this.onKeyUp = this.onKeyUp.bind(this);
  }

  makeHtml () {
    //var htmlValue = marked(this.mdValue, {sanitize: true});
    var htmlValue = marked(this.mdValue, {renderer: renderer, sanitize: true});
    return {__html: htmlValue}
  }
  onKeyUp() {
    // console.log('in keyup');
    this.mdValue = document.querySelector('textarea').value;    
    // console.log(this.mdValue);
    this.setState({text: this.mdValue});
  }

  render() {
    return (
      <div className="container">
        <div className="row">
        <div className="col-md-6">
        <textarea 
          id="editor"
          onChange={this.onKeyUp} 
          defaultValue={this.mdValue}
          className="form-control form-control-lg" 
          rows="20">
        </textarea>
        </div>

        <div className="col-md-6" >
        <span id="preview" dangerouslySetInnerHTML={this.makeHtml()}></span>
        </div>
        </div>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Markdown Previewer</h1>
        </header>
        <Marked />
      </div>
    );
  }
}

export default App;
