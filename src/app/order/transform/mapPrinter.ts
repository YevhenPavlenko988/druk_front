import {PrinterDTO} from '../models/PrinterDTO';
import {PrinterDTOView} from '../models/PrinterDTOView';


export function mapPrinter(printer: PrinterDTO): PrinterDTOView {
    const p = (printer || {}) as PrinterDTOView;

    // p.$isNoPaper = printer.paperLeft === 0;
    p.$sheetsClass = printer.paperLeft === 0 ? 'not-available' : '';

    return p;
}
