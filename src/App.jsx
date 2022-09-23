import React, { useState } from 'react';

import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';
import './App.scss';
import { GenerateCompleteData } from './CompleteData/GenerateCompeletData';
import { HelmetProvider, Helmet } from 'react-helmet-async';

export default function App() {
  //for navigating to another page
  const navigate = useNavigate();
  var json = null;
  localStorage.clear();
  //query to insert text
  localStorage.setItem(
    'insertText',
    "Insert into CL0150GTU_BASE.BASE_TX (TX_ID, END_DT, TX_NM, LCLE_CD, TX_VL, BEG_DT, TX_DSC, VRSN_NR, CRT_DT, CRT_BY, LST_UPD_BY, LST_UPD_DT, IS_OVRD, IS_NDS_MR_INFO, IS_REUSABLE, IS_CLNT_FACE) VALUES('70d95a31-7630-4725-8c10-7b5d3cd4e', TO_DATE('2299-12-31','yyyy-mm-dd'),'name', 'en_US','value', TO_DATE('2022-07-18','yyyy-mm-dd'), 'description', 0, TO_DATE('2022-07-18 13:17:45','yyyy-mm-dd hh24:mi:ss'), 'harinath.g@alight.com', 'harinath.g@alight.com', TO_DATE('2022-07-18 13:17:45','yyyy-mm-dd hh24:mi:ss'), 1, 0, 1, 0);"
  );
  //query to update text
  localStorage.setItem(
    'updateText',
    "Update CL0150GTU_BASE.BASE_TX Set TX_VL='value' where TX_NM='text name' and LCLE_CD= 'en_US';"
  );
  //query to insert asset
  localStorage.setItem(
    'insertAsset',
    "Insert into CL0150GTU_BASE.ASSETGROUPINSTANCEASSETS (ID, SEQUENCE, HTMLMARKUP, NAME, DESCRIPTION, ASSETTYPE, ASSETKEY, EXPRESSIONKEY, ASSETGROUP_ID, HTML_BEG_TAG_TX, HTML_END_TAG_TX, IS_CUST_TAG, IS_EXPR_CNFG, IS_REPT, IS_BASE_CNFG) VALUES('56b4c7f1-333b-211f-ae6b-5eee5187f352',56, Null, 'UPN_HM_WORKLIFE_HLP_HEALTH_AND_INSURANCE_SUB_TITLE', 'UPN_HM_WORKLIFE_HLP_HEALTH_AND_INSURANCE_SUB_TITLE', 'text', 'UPN_HM_WORKLIFE_HLP_HEALTH_AND_INSURANCE_SUB_TITLE', null, 'd3afcedc-e11a-40e9-b35c-55922db759fc', Null, Null, 0, 0, 0, 0);"
  );
  //query to update asset
  localStorage.setItem(
    'updateAsset',
    "Update CL0150GTU_BASE.ASSETGROUPINSTANCEASSETS Set DESCRIPTION='description' where NAME='name' and ASSETGROUP_ID='assetgrpID';"
  );
  /*getting the values of selectedradio buttons and storing in state*/
  const [queryType, setQueryType] = useState();
  const [typeOfUpdate, setTypeOfUpdate] = useState();

  //set queryType as Insert/Update
  const onQueryTypeChange = (e) => {
    setQueryType({
      selectedOption: e.target.value,
    });
  };
  //set typeOfUpdate as TEXT/ASSET
  const onTypeOfQueryChange = (e) => {
    setTypeOfUpdate({
      selectedOption: e.target.value,
    });
    // below code will add more required input feilds if the typeofUpdate is Asset
    if (e.target.value == 'ASSET' && queryType.selectedOption == 'Insert') {
      document.getElementById('asset_group_ID').style.display = 'contents';
      document.getElementById('Sequence_Num').style.display = 'contents';
      document.getElementById('asset_group_ID').required = true;
      document.getElementById('Sequence_Num').required = true;
    } else if (
      e.target.value == 'ASSET' &&
      queryType.selectedOption != 'Insert'
    ) {
      document.getElementById('asset_group_ID').style.display = 'contents';
      document.getElementById('Sequence_Num').style.display = 'none';
      document.getElementById('asset_group_ID').required = true;
      document.getElementById('Sequence_Num').required = false;
    } else {
      document.getElementById('asset_group_ID').style.display = 'none';
      document.getElementById('Sequence_Num').style.display = 'none';
      document.getElementById('asset_group_ID').required = false;
      document.getElementById('Sequence_Num').required = false;
    }
  };
  //handle the uploaded excel data file
  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      //convertingexcel data to JSON format
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        json = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
        //storingthejsonobject in localstorage of web browser to access it anytime in browser
        localStorage.setItem('myData', JSON.stringify(json));
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };
  //operation to be done on submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.mail_id.value;
    const BGDticket = e.target.ticket_id.value;
    localStorage.setItem('BGDticketNumber', BGDticket);

    if (
      typeOfUpdate.selectedOption == 'ASSET' &&
      queryType.selectedOption == 'Insert'
    ) {
      localStorage.setItem(
        'asset_groupID',
        document.getElementById('asset_groupID').value
      );
      localStorage.setItem(
        'Sequence_Num',
        document.getElementById('Sequence_Number').value
      );
    } else if (
      typeOfUpdate.selectedOption == 'ASSET' &&
      queryType.selectedOption != 'Insert'
    ) {
      localStorage.setItem(
        'asset_groupID',
        document.getElementById('asset_groupID').value
      );
    }
    GenerateCompleteData(queryType, typeOfUpdate, email);
    navigate('/PreviewData', { replace: true });
  };

  //HTML page code of homepage
  return (
    <HelmetProvider>
      <div className="main-container">
        <Helmet>
          <title>SQL-Query_replicator</title>
          <meta name="description" content="App </div>Description" />
          <meta name="theme-color" content="#008f68" />
          <style>{'body { background-color: #010a14;}'}</style>
        </Helmet>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="input-label">Select the type of query: </label>
            <br />
            <label>
              <input
                name="queryType"
                type="radio"
                value="Insert"
                onChange={onQueryTypeChange}
                required={true}
              />
              &nbsp; &nbsp;INSERT &nbsp; &nbsp;
            </label>
            <label>
              <input
                name="queryType"
                type="radio"
                value="Update"
                onChange={onQueryTypeChange}
              />
              &nbsp; &nbsp;UPDATE &nbsp; &nbsp;
            </label>
          </div>
          <div>
            <label className="input-label">
              Select the type of Data Update:{' '}
            </label>
            <br />
            <label>
              <input
                name="typeOfUpdate"
                type="radio"
                value="TEXT"
                onChange={onTypeOfQueryChange}
                required={true}
              />
              &nbsp; &nbsp;TEXT &nbsp; &nbsp;
            </label>
            <label>
              <input
                name="typeOfUpdate"
                type="radio"
                value="ASSET"
                onChange={onTypeOfQueryChange}
              />
              &nbsp; &nbsp;ASSET &nbsp; &nbsp;
            </label>
          </div>
          <div className="asset_group_ID" id="asset_group_ID">
            <label htmlFor="asset_groupID" className="input-label">
              Eneter the asset group ID:
            </label>
            <input
              type="text"
              name="asset_groupID"
              id="asset_groupID"
              className="form-control"
              placeholder="Eneter the asset group ID"
            />
          </div>
          <div className="Sequence_Num" id="Sequence_Num">
            <label htmlFor="Sequence_Number" className="input-label">
              Eneter the Last Sequence Number:
            </label>
            <input
              type="text"
              name="Sequence_Number"
              id="Sequence_Number"
              className="form-control"
              placeholder="Eneter the Last Sequence Number of Asset Group"
            />
          </div>
          <div>
            <label htmlFor="data-file" className="input-label">
              Select the file with the data:
            </label>
            <input
              type="file"
              name="data-file"
              className="form-control data-file"
              id="data-file"
              accept=".xlsx, .xls, .csv"
              onChange={readUploadFile}
              required={true}
            />
          </div>

          <div>
            <label htmlFor="mail_id" className="input-label">
              Enter alight Mail ID:
            </label>
            <input
              type="email"
              name="mail_id"
              id="mail_id"
              className="form-control"
              placeholder="name@alight.com"
              required={true}
            />
          </div>
          <div>
            <label htmlFor="ticket_id" className="input-label">
              Eneter JIRA Ticket Number:
            </label>
            <input
              type="text"
              name="ticket_id"
              id="ticket_id"
              className="form-control"
              placeholder="BGD-0000"
              required={true}
            />
          </div>
          <input
            type="submit"
            id="submit"
            value="SUBMIT"
            className="btn btn-success rounded-pill preview"
          />
        </form>
      </div>
    </HelmetProvider>
  );
}
