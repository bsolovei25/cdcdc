export interface IKpeAccuracyTimelinesHeaders {
    Date: string,
    SubCategory: number,
    Percent: number,
    PercentageInfluence: number,
    Categories: string
}

export interface IKpeAccuracyTimelinesRow {
    commentOfAdjustment: string,
    dateOfAdjustment: string
}

export interface IKpeAccuracyTimelinesData {
    headers: { name: string, value: string | number }[],
    rows: IKpeAccuracyTimelinesRow[]
}
