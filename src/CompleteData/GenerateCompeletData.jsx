import { v1 as uuidv1 } from 'uuid';
import { GenerateFinalQueries } from '../FinalQueries/GenerateFinalQueries';
export function GenerateCompleteData(queryType, typeOfUpdate, email) {
  let inputData = JSON.parse(localStorage.getItem('myData'));
  localStorage.setItem('queryType', queryType.selectedOption);
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  var hr = today.getHours();
  var min = today.getMinutes();
  var sec = today.getSeconds();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  if (hr < 10) {
    hr = '0' + hr;
  }
  if (min < 10) {
    min = '0' + min;
  }
  if (sec < 10) {
    sec = '0' + sec;
  }
  let dtfrmt = 'yyyy-mm-dd hh24:mi:ss';
  let dt = yyyy + '-' + mm + '-' + dd + ' ' + hr + ':' + min + ':' + sec;
  let bg_DT = yyyy + '-' + mm + '-' + dd;
  let bg_frmt = 'yyyy-mm-dd';
  let completeData = [];
  var obj = {};
  let defaultTextData = {};
  let defaultAssetData = {};
  let asset_groupID = '';
  let Sequence_num = 0;
  if (queryType.selectedOption == 'Insert') {
    if (typeOfUpdate.selectedOption == 'TEXT') {
      defaultTextData = {
        TX_ID: 'id',
        END_DT: "TO_DATE('2299-12-31','yyyy-mm-dd')",
        TX_NM: 'name',
        LCLE_CD: 'en_US',
        TX_VL: 'value',
        BEG_DT: "TO_DATE('2022-07-18','yyyy-mm-dd')",
        TX_DSC: 'description',
        VRSN_NR: 0,
        CRT_DT: "TO_DATE('2022-07-18 13:17:45','yyyy-mm-dd hh24:mi:ss')",
        CRT_BY: 'email',
        LST_UPD_BY: 'email',
        LST_UPD_DT: "TO_DATE('2022-07-18 13:17:45','yyyy-mm-dd hh24:mi:ss')",
        IS_OVRD: 1,
        IS_NDS_MR_INFO: 0,
        IS_REUSABLE: 1,
        IS_CLNT_FACE: 0,
      };
      generateInsertData(defaultTextData);
    } else {
      defaultAssetData = {
        ID: '56b4c7f1-333b-211f-ae6b-5eee5187f3',
        SEQUENCE: 1,
        HTMLMARKUP: null,
        NAME: 'name',
        DESCRIPTION: 'description',
        ASSETTYPE: 'text',
        ASSETKEY: 'value',
        EXPRESSIONKEY: null,
        ASSETGROUP_ID: '56b4c7f1-333b-211f-ae6b-5eee5187f3',
        HTML_BEG_TAG_TX: null,
        HTML_END_TAG_TX: null,
        IS_CUST_TAG: 0,
        IS_EXPR_CNFG: 0,
        IS_REPT: 0,
        IS_BASE_CNFG: 0,
      };
      asset_groupID = localStorage.getItem('asset_groupID');
      Sequence_num = parseInt(localStorage.getItem('Sequence_Num'));
      generateInsertData(defaultAssetData);
    }
  } else {
    generateUpdateData();
  }
  function generateInsertData(defaultData) {
    let columnNames = Object.keys(defaultData);
    let defaultValues = Object.values(defaultData);
    let col_num = 1;
    for (let i = 0; i < inputData.length; i++) {
      const element = inputData[i];
      obj['ITEM_NUM'] = col_num++;
      for (let index = 0; index < columnNames.length; index++) {
        let colname = columnNames[index];
        if (!element[colname]) {
          if (colname == 'ASSETGROUP_ID') {
            obj[colname] = asset_groupID;
          } else if (colname == 'SEQUENCE') {
            Sequence_num = Sequence_num + 1;
            obj[colname] = Sequence_num;
          } else if (colname.includes('ID')) {
            obj[colname] = uuidv1();
          } else if (colname == 'CRT_DT' || colname == 'LST_UPD_DT') {
            obj[colname] = "TO_DATE('" + dt + "','" + dtfrmt + "')";
          } else if (colname == 'BEG_DT') {
            obj[colname] = "TO_DATE('" + bg_DT + "','" + bg_frmt + "')";
          } else if (colname.includes('BY')) {
            obj[colname] = email;
          } else if (defaultValues[index] == null) {
            obj[colname] = 'null';
          } else {
            obj[colname] = defaultValues[index];
          }
        } else {
          if (colname == 'NAME' || colname == 'TX_NM') {
            obj[colname] = element[colname].replaceAll(' ', '');
          } else if (typeof element[colname] == 'string') {
            obj[colname] = element[colname].trim();
          } else {
            obj[colname] = element[colname];
          }
        }
      }

      completeData.push(obj);
      obj = {};
    }
    localStorage.setItem('CompleteData', JSON.stringify(completeData));
    GenerateFinalQueries(queryType, typeOfUpdate);
  }
  function generateUpdateData() {
    asset_groupID = localStorage.getItem('asset_groupID');
    let columnNames = [];
    let col_num = 1;
    for (let i = 0; i < inputData.length; i++) {
      const element = inputData[i];
      columnNames = Object.keys(element);
      obj['ITEM_NUM'] = col_num++;
      for (let index = 0; index < columnNames.length; index++) {
        let colname = columnNames[index];
        if (!element[colname]) {
          if (colname == 'ASSETGROUP_ID') {
            obj[colname] = asset_groupID;
          } else if (colname == 'LCLE_CD') {
            obj[colname] = 'en_US';
          } else {
            obj['LST_UPD_DT'] = "TO_DATE('" + dt + "','" + dtfrmt + "')";
            obj['LST_UPD_BY'] = email;
          }
        } else {
          if (colname == 'NAME' || colname == 'TX_NM') {
            obj[colname] = element[colname].replaceAll(' ', '');
          } else if (typeof element[colname] == 'string') {
            obj[colname] = element[colname].trim();
          } else {
            obj[colname] = element[colname];
          }
        }
      }

      completeData.push(obj);
      obj = {};
    }
    localStorage.setItem('CompleteData', JSON.stringify(completeData));
    GenerateFinalQueries(queryType, typeOfUpdate);
  }
}
