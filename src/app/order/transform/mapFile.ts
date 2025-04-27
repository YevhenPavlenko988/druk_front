import {getFileName} from '../utils/getFileName';
import {MIN_COPIES_COUNT} from '../consts';
import {FileDTO} from '../models/FileDTO';
import {FileView} from '../models/FileView';
import {PrintTypeEnum} from '../models/PrintTypeEnum';


export function mapFile(file: FileDTO): FileView {
    const f = (file || {}) as FileView;

    f.$name = getFileName(file.s3key);
    f.$printType = PrintTypeEnum.ONE_SIDED;
    f.$copiesCount = MIN_COPIES_COUNT;

    return f;
}
