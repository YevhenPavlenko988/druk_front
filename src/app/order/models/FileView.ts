import {FileDTO} from './FileDTO';
import {PrintTypeEnum} from './PrintTypeEnum';

export interface FileView extends FileDTO {
    $name?: string,
    $printType?: PrintTypeEnum,
    $copiesCount?: number
}
