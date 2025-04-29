import {getFileName} from '../utils/getFileName';
import {MIN_COPIES_COUNT} from '../consts';
import {FileDTO} from '../models/FileDTO';
import {FileDTOView} from '../models/FileDTOView';
import {PrintTypeEnum} from '../models/PrintTypeEnum';


export function mapFile(file: FileDTO): FileDTOView {
    const f = (file || {}) as FileDTOView;

    f.$name = getFileName(file.s3key);
    f.$printType = PrintTypeEnum.ONE_SIDED;
    f.$copiesCount = MIN_COPIES_COUNT;

    return f;
}
