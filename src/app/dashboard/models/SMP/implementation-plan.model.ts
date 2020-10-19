export interface IAllCrude {
    messages: IAllCrudeMessages[];
    data: IImplementationPlan[];
  }

export interface IAllCrudeMessages {
    type: string;
    message: string;
    httpCode: number;
  }

export interface IImplementationPlan {
    id: number;
    title: string;
    value: number;
    deviation: number;
    deviationPercent: number;
    restPer: number;
    freePer: number;
}