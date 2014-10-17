/** @jsx React.DOM */
'use strict';

var React = require('react');
var DocumentTitle = require('react-document-title');

var AboutPage = React.createClass({
  render() {

    return (
      <DocumentTitle title='About Page'>
        <div id='about'>
          <article className="markdown-body entry-content"><h1>
            <a name="user-content-react-weibo" className="anchor" href="#react-weibo" aria-hidden="true"><span className="octicon octicon-link"></span></a>react-weibo</h1>

            <p>An experiment to make a pure client-side Sina weibo client with reactjs.</p>

            <p><a href="http://react-weibo.herokuapp.com/">Live demo</a> here.</p>

            <p>PS: Still WIP.</p>

            <h3><a name="user-content-tools" className="anchor" href="#tools" aria-hidden="true"><span className="octicon octicon-link"></span></a>Tools</h3>

            <ul className="task-list">
              <li>Webpack - Build(There\'s also an browserify branch)</li>
              <li>React - View</li>
              <li>Express - Auth server only, to send accessToken to client.</li>
            </ul>

            <h3>
              <a name="user-content-development" className="anchor" href="#development" aria-hidden="true"><span className="octicon octicon-link"></span></a>Development
            </h3>

            <pre><code>$ cp config.example.json config.json
            $ npm i
            $ webpack
            </code></pre>

            <h3><a name="user-content-license" className="anchor" href="#license" aria-hidden="true"><span className="octicon octicon-link"></span></a>License</h3>

            <p>MIT</p>
          </article>
        </div>
      </DocumentTitle>
    );
  }
});

module.exports = AboutPage;
