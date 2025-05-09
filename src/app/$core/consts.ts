import {ICONS} from './icons';
import {StepsEnum} from './header/StepsEnum';
import {Step} from './header/Step';


//
// icons
export const SVG_ICONS: Array<string> = Object.values(ICONS);

//
//
export const DEFAULT_LANG = 'en';
export const STORAGE_LANG_NAME: string = 'lang';

//
// header
export const HEADER_TITLE_LABEL = 'common.header.title';
export const HEADER_STEP_FILES_LABEL = 'common.header.steps.files';
export const HEADER_STEP_PAYMENT_LABEL = 'common.header.steps.payment';
export const HEADER_STEP_PRINT_LABEL = 'common.header.steps.print';

//
//
export const COMMON_ERROR_LABEL = 'Something went wrong';

//
// steps
export const STEPS_DETAILS: Array<Step> = [
    {code: StepsEnum.adding, label: HEADER_STEP_FILES_LABEL, value: '1'},
    {code: StepsEnum.payment, label: HEADER_STEP_PAYMENT_LABEL, value: '2'},
    {code: StepsEnum.printing, label: HEADER_STEP_PRINT_LABEL, value: '3'}
];
