import {PrintTypeEnum} from './PrintTypeEnum';

export interface SubOrderDTO {
    fileId?: string,
    copiesCount?: number,
    printType?: PrintTypeEnum
}
