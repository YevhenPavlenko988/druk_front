import {FileDTO} from './FileDTO';
import {PrintTypeEnum} from './PrintTypeEnum';

export interface FileDTOView extends FileDTO {
    $name?: string,
    $printType?: PrintTypeEnum,
    $copiesCount?: number
}
