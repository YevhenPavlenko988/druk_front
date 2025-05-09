//
// route param
export const ROUTE_PRINTER_ID = 'id';

//
export const MAX_SIZE_MB = 50;
export const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;
export const MIN_COPIES_COUNT = 1;
export const MAX_COPIES_COUNT = 100;
export const DECIMAL_PATTERN = '1.2-2';

//
// form fields
export const FORM_ID = 'formId';
export const PRINT_TYPE = 'printType';
export const COPIES_COUNT = 'copiesCount';

export const FILE_FORMATS: Array<string> = [
    '.docx', '.pptx', '.xls', '.doc', '.xlsx', '.ppt', '.txt', '.pdf',
    '.jpg', '.png', '.gif', '.tiff', '.bmp', '.heic', '.bin', '.html',
    '.xml', '.csv', '.odt', '.ods', '.odp', '.odg', '.odc', '.odf',
    '.odm', '.oth', '.ott', '.ots', '.otp', '.otg', '.otc', '.otf',
    '.otm', '.rtf', '.md'
];
