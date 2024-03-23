import TableToExcel from "@linways/table-to-excel";

export function exportToExcel(tableData, nameData) {
    let dataTable = document.getElementById(tableData)
        
    if (dataTable !== ''){
    TableToExcel.convert(dataTable, {
      name: nameData + ".xlsx",
      sheet: {
        name: "Hoja 1"
      }
    });
  ;
}
}