export interface IUnits {
    averageUnit: number,
    instantUnit: number,
    planUnit: number,
    valuePlanUnit: number,
    totalUnit: number,
    predictionUnit: number,
    valueRecommended: number,
    deviationUnits: number
}

export interface IHeadersSelectors {
    averageConsumption: { id: number, value: string }[],
    instantConsumption: { id: number, value: string }[],
    plan: { id: number, value: string }[],
    valuePlan: { id: number, value: string }[],
    total: { id: number, value: string }[],
    prediction: { id: number, value: string }[],
    deviation: { id: number, value: string }[],
    valueRecommended: { id: number, value: string }[],
}
