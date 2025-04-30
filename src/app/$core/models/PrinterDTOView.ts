import {PrinterDTO} from './PrinterDTO';

export interface PrinterDTOView extends PrinterDTO {
    $isNoPaper?: boolean;
    $sheetsClass?: string;
}
