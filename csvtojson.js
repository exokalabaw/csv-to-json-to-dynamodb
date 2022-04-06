import csvToJson from 'convert-csv-to-json';

let fileInputName = 'instruments.csv'; 
let fileOutputName = 'instruments.json';

csvToJson.fieldDelimiter(',').generateJsonFileFromCsv(fileInputName,fileOutputName);