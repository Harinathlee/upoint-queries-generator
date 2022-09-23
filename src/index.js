import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import { PreviewData } from './CompleteData/PreviewData';
// importing components from react-router-dom package
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ViewSelectQuery } from './CheckDuplicates/ViewSelectQuery';
import { ViewFinalQueries } from './FinalQueries/ViewFinalQueries';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="PreviewData" element={<PreviewData />} />
        <Route path="ViewSelectQuery" element={<ViewSelectQuery />} />
        <Route path="ViewFinalQueries" element={<ViewFinalQueries />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
