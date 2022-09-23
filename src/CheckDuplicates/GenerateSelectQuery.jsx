//Generates a select query to check whether there are any item is already in DB table to prevent duplicates
export function GenerateSelectQuery(data, tableName) {
  let values = '';
  let colname = '';
  if (tableName.includes('TX')) {
    colname = 'TX_NM';
  } else {
    colname = 'NAME';
  }
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    if (index != data.length - 1) {
      values = values + "'" + element[colname] + "' ,";
    } else {
      values = values + "'" + element[colname] + "'";
    }
  }
  let selectQuery =
    'Select * from ' +
    tableName +
    ' where ' +
    colname +
    ' in (' +
    values +
    ') and ';
  if (tableName.includes('TX')) {
    selectQuery = selectQuery + "LCLE_CD= 'en-US';";
  } else {
    selectQuery =
      selectQuery +
      "ASSETGROUP_ID= '" +
      localStorage.getItem('asset_groupID') +
      "';";
  }
  localStorage.setItem('SelectQuery', selectQuery);
}
