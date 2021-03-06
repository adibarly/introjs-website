import CodeBlock from "@theme/CodeBlock";
import React, {Component, useEffect, useRef} from "react";
import introJs from 'intro.js';

// DO NOT REMOVE EVEN IF UNUSED
import * as style from 'intro.js/introjs.css';

export class LiveExample extends Component {
  componentDidMount() {
    if (this.props.rtl) {
      const head = document.head;
      this.rtlLink = document.createElement("link");

      this.rtlLink.type = "text/css";
      this.rtlLink.rel = "stylesheet";
      this.rtlLink.href = "https://cdn.jsdelivr.net/npm/intro.js/introjs-rtl.css";

      head.appendChild(this.rtlLink);
    }
  }

  componentWillUnmount() {
    if (this.rtlLink) {
      const head = document.head;
      head.removeChild(this.rtlLink);
    }

    const hintsWrapper = document.querySelector('.introjs-hints');

    if (hintsWrapper) {
      hintsWrapper.parentNode.removeChild(hintsWrapper);
    }
  }

  render() {
    return (
      <CodeBlock
        children={this.props.children}
        transformCode={(code) =>
          `
function () {
  let tour = null;
  
  const isHints = ${code.search("addHints") > -1};
  
  setTimeout(() => {
    tour = ${code.replace(/\.start\(\)(;)?$/gi, '').replace(/\.addHints\(\)(;)?$/gi, '')}
  }, 500);
  
  const run = () => {
    if (isHints) {
      tour.addHints();
    } else {
      tour.start();
    }
  };
  
  return (
    <button onClick={() => run()} className="button button--lg button--primary">
      <span style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '0.3em', marginBottom: '0.2em' }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="20px" height="20px">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
        </svg>
      </span>
      Run
    </button>
  );
}
` } live={true} scope={{ introJs, CodeBlock, useEffect, useRef, ...this.props.scope }} />
    )
  }
}
