export interface IFileInfo {
    contentType: string,
    createdAt: string,
    createdBy: number,
    id: string,
    name: string,
    percent: number,
    size: number,
    sizeInMb: string
}

export interface IKpeAccTimelinesDataEditPlan {
    adjustmentComment: string,
    dateOfCreation: string,
    dateOfCorrection: string
}
