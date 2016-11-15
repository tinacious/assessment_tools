'use strict';

const Request = require('sync-request');

const projectHtmlUrl = process.argv[2];
const projectCssUrl = process.argv[3];
if (!projectHtmlUrl || !projectCssUrl) {
  throw new Error('Project URL HTML and CSS required as the first and second command arguments, respectively, e.g. node path/to/validate_perfect_paddles.js http://user.github.io/project http://user.github.io/project/style.css');
}


/**
 * W3 validator is picky about user agents
 * @return {Object}
 */
const getBaseRequestOptions = () => ({
  headers: { 
    'Content-Type': 'text/html; charset=utf-8',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36'
  },
  json: true
});


// RUN IT!
outputHtmlResults();
outputCssResults();



function outputHtmlResults() {
  const htmlResults = validateHtml(projectHtmlUrl);
  console.log(`########## HTML RESULTS: ${projectHtmlUrl}`)
  console.log(htmlResults.join('\n'));
}

function outputCssResults() {
  const cssResults = validateCss(projectCssUrl);
  console.log(`########## CSS RESULTS: ${projectCssUrl}`)
  console.log(cssResults.join('\n'));
}

/**
 * Runs the provided HTML URL through the W3 Validator and 
 * returns the results, including errors and warnings
 * @param  {String} htmlUrl
 * @return {Array}
 */
function validateHtml(htmlUrl) {
  
  const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36';
  const qs = {
    out: 'json',
    doc: htmlUrl
  };
  const requestOptions = Object.assign({}, getBaseRequestOptions(), { qs });

  // Make request
  const response = Request('GET', 'http://validator.w3.org/nu/', requestOptions);
  const body = JSON.parse(response.getBody('utf8'));

  // Collect results
  const results = [];
  body.messages.forEach((messageObj) => {

    const type = messageObj.type;
    const result = `${(messageObj.subType || type).toUpperCase()}: Ln ${messageObj.lastLine}, Col ${messageObj.lastColumn} -- ${messageObj.message}`;
    
    results.push(result);
  });

  return results;
}


/**
 * Runs the provided CSS URL through the W3 Validator and 
 * returns the results, including errors and warnings
 * @param  {String} cssUrl
 * @return {Array}
 */
function validateCss(cssUrl) {

  const qs = {
    uri: cssUrl,
    output: 'json',
    profile: 'css3'
  };
  const requestOptions = Object.assign({}, getBaseRequestOptions(), { qs });

  // Make request
  const response = Request('GET', 'http://jigsaw.w3.org/css-validator/validator', requestOptions);
  const body = JSON.parse(response.getBody('utf8'));

  // Collect results
  const results = [];

  ['errors', 'warnings'].forEach((type) => {
    const messages = body.cssvalidation[type];

    if (messages) {
      messages.forEach((messageObj) => {
        const result = `${type.toUpperCase()}: Ln ${messageObj.line} -- ${messageObj.message}`;
        results.push(result);
      });
    }
  });

  return results;
}