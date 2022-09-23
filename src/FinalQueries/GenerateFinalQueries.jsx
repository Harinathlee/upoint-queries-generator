import { GenerateSelectQuery } from '../CheckDuplicates/GenerateSelectQuery';

export function GenerateFinalQueries(queryType, typeOfUpdate) {
  let completeData = JSON.parse(localStorage.getItem('CompleteData'));
  let queryInput = '';
  let finalQuery = '';
  let finalQueries = new Array();
  let tableName = '';
  // if we are trying to insert new items this will execute
  if (queryType.selectedOption == 'Insert') {
    //if the type of data we are inserting is text items
    if (typeOfUpdate.selectedOption == 'TEXT') {
      queryInput = localStorage.getItem('insertText');
    }
    //if the type of data we are inserting is assets
    else {
      queryInput = localStorage.getItem('insertAsset');
    }

    tableName = queryInput.split(' ')[2];
    GenerateSelectQuery(completeData, tableName);

    //loop to access all values and add it to the query
    for (let index = 0; index < completeData.length; index++) {
      finalQuery = queryInput.substring(
        queryInpu.indexOf('Insert'),
        queryInput.indexOf('VALUES') + 7
      );
      const element = completeData[index];
      let columnNames = Object.keys(element);

      for (let i = 1; i < columnNames.length; i++) {
        const colname = columnNames[i];
        const value = element[colname];
        if (
          typeof value == 'number' ||
          (typeof value == 'string' && colname.includes('DT')) ||
          value == 'null'
        ) {
          finalQuery = finalQuery + value + ',';
        } else {
          finalQuery = finalQuery + "'" + value + "',";
        }
      }
      finalQuery = finalQuery + ');';
      finalQueries.push(finalQuery);
    }
    localStorage.setItem('finalQueries', JSON.stringify(finalQueries));
  } else {
    //if the type of data we are updating is text items
    let whereCondition = ' where ';
    if (typeOfUpdate.selectedOption == 'TEXT') {
      queryInput = localStorage.getItem('updateText');
    }
    //if the type of data we are updating is assets
    else {
      queryInput = localStorage.getItem('updateAsset');
    }
    for (let index = 0; index < completeData.length; index++) {
      finalQuery = queryInput.substring(
        queryInput.indexOf('Update'),
        queryInput.indexOf('Set') + 4
      );

      const element = completeData[index];
      let columnNames = Object.keys(element);

      for (let i = 1; i < columnNames.length; i++) {
        const colname = columnNames[i];
        const value = element[colname];
        if (colname == 'NAME' || colname == 'TX_NM') {
          whereCondition = whereCondition + colname + "='" + value + "' and ";
        } else if (colname == 'LCLE_CD' || colname == 'ASSETGROUP_ID') {
          whereCondition = whereCondition + colname + "='" + value + "'";
        } else if (
          (typeof value == 'number' ||
            (typeof value == 'string' && colname.includes('DT')) ||
            value == 'null') &&
          typeOfUpdate.selectedOption == 'TEXT'
        ) {
          console.log(
            typeOfUpdate.selectedOption + ':' + colname + ':' + value
          );
          if (i + 1 != columnNames.length) {
            finalQuery = finalQuery + colname + '=' + value + ',';
          } else {
            finalQuery = finalQuery + colname + '=' + value + ' ';
          }
        } else {
          console.log(
            typeOfUpdate.selectedOption + ':' + colname + ':' + value
          );
          if (
            i + 1 != columnNames.length &&
            (colname != 'LST_UPD_BY' || colname != 'LST_UPD_DT')
          ) {
            finalQuery = finalQuery + colname + "='" + value + "',";
          } else {
            finalQuery = finalQuery + colname + "='" + value + "' ";
          }
        }
      }

      finalQuery = finalQuery + whereCondition + ';';
      whereCondition = ' where ';
      finalQueries.push(finalQuery);
    }
    if (queryInput.includes('ASSET')) {
      const element = completeData[0];
      let email = element['LST_UPD_BY'];
      let date = element['LST_UPD_DT'];
      let assetGrpID = element['ASSETGROUP_ID'];
      finalQuery =
        "Update CL0150GTU_BASE.ASSETGROUP Set LST_UPD_BY='" +
        email +
        "',LST_UPD_DT='" +
        date +
        "' where ID='" +
        assetGrpID +
        "';";
    }
    finalQueries.push(finalQuery);
    localStorage.setItem('finalQueries', JSON.stringify(finalQueries));
  }
}
