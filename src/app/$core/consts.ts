import {ICONS} from './icons';
import {StepsEnum} from './steps/StepsEnum';
import {Step} from './steps/Step';


//
// icons
export const SVG_ICONS: Array<string> = Object.values(ICONS);

//
//
export const DEFAULT_LANG = 'en';
export const STORAGE_LANG_NAME = 'lang';
export const STEPS_COUNT = 3;

//
// header
export const HEADER_STEP_LABEL = 'common.header.step';
export const HEADER_TITLE_FILES_LABEL = 'common.header.title.files';
export const HEADER_TITLE_PAYMENT_LABEL = 'common.header.title.payment';
export const HEADER_TITLE_PRINT_LABEL = 'common.header.title.print';

//
//
export const COMMON_ERROR_LABEL = 'Something went wrong';

//
// steps
export const STEPS_DETAILS: Array<Step> = [
    {code: StepsEnum.adding, label: HEADER_TITLE_FILES_LABEL, value: '1'},
    {code: StepsEnum.payment, label: HEADER_TITLE_PAYMENT_LABEL, value: '2'},
    {code: StepsEnum.printing, label: HEADER_TITLE_PRINT_LABEL, value: '3'},
];
