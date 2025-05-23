export interface PrinterDTO {
    id?: string,
    createdAt?: string,
    updatedAt?: string,
    createUserId?: string,
    updateUserId?: string,
    name?: string,
    ip?: string,
    url?: string,
    paperLeft?: number,
    paperMax?: number,
    address?: string,
    latitude?: number,
    longitude?: number,
    photoUrl?: string,
    model?: string,
    serialNumber?: string,
    note?: string
    lastService?: string,
    isActive?: boolean,
    isOnline?: boolean,
    schedule?: string,
    priceOneSide?: number,
    priceDuplex?: number,
    serviceFee?: number
}
