import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import '../styles.scss';

export function ViewFinalQueries() {
  const finalQueries = JSON.parse(localStorage.getItem('finalQueries'));
  let querytags = '';
  let queries = '';
  const viewQueries = () => {
    for (let query in finalQueries) {
      queries = queries + finalQueries[query] + '\n';
      querytags = querytags + '<p>' + finalQueries[query] + '</p>';
    }
    document.getElementById('query').innerHTML = querytags;
  };
  const handleOnCopy = () => {
    // Copy the text inside the text field
    navigator.clipboard.writeText(queries);
    document.getElementById('copy-btn').innerHTML = 'COPIED';
    document.getElementById('copy-btn').style = 'background-color:#010a14;';
  };

  return (
    <HelmetProvider>
      <div>
        <div className="previewData-container">
          <Helmet>
            <title>SQL-Query_replicator</title>
            <meta name="description" content="App Description" />
            <meta name="theme-color" content="#008f68" />
            <style>{'body { background-color: #010a14; color:white}'}</style>
          </Helmet>
          <button
            id="copy-btn"
            className="gen-btn btn-success rounded-pill copy-btn"
            onClick={handleOnCopy}
          >
            COPY
          </button>
          <br />
          <p id="query" onClick={viewQueries}>
            {finalQueries}
          </p>
        </div>
      </div>
    </HelmetProvider>
  );
}
