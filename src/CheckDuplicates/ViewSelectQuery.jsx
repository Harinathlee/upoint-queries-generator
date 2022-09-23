import React, { useState } from 'react';

import '../styles.scss';
import { useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export function ViewSelectQuery() {
  const navigate = useNavigate();
  const selectQuery = localStorage.getItem('SelectQuery');
  const [checkbox, setCheckBox] = useState(false);
  const handleOnCopy = () => {
    // Copy the text inside the text field

    navigator.clipboard.writeText(selectQuery);
    document.getElementById('copy-btn').innerHTML = 'COPIED';
    document.getElementById('copy-btn').style = 'background-color:#010a14;';
  };
  const handleCheckBox = () => {
    if (
      !document.getElementById('checkBox').checked ||
      document.getElementById('checkBox').checked == false
    ) {
      document.getElementById('gen-btn').value = 'Resubmit the Form';
    } else {
      document.getElementById('gen-btn').value = 'Generate Insert Queries';
    }
  };

  const handleOnClick = () => {
    if (
      document.getElementById('checkBox').checked == true &&
      document.getElementById('gen-btn').value.includes('Generate')
    ) {
      navigate('/ViewFinalQueries', { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  };
  return (
    <HelmetProvider>
      <div className="whole-container">
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
          <p id="query">{selectQuery}</p>
        </div>
        <br />
        <div className="Footer-Div">
          <input
            type="checkbox"
            name="checkBox"
            id="checkBox"
            value="NoDuplicates"
            onChange={handleCheckBox}
          />
          <label htmlFor="checkBox">
            There are no Duplicates present in DB
          </label>
          <br />
          <input
            id="gen-btn"
            type="button"
            className="gen-fin-btn btn-success rounded-pill preview"
            value="Resubmit the Form"
            onClick={handleOnClick}
          />
        </div>
      </div>
    </HelmetProvider>
  );
}
