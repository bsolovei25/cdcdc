export interface ICmidVectorDiagramModel {
    id: number,
    title: string;
    centerValue: number;
    growIndex: number;
    downIndex: number;
    points: ICmidVectorDiagramModelPoint[];
}

export interface ICmidVectorDiagramModelPoint {
    name: string,
    link: string,
    itemFactValue: number,
    itemNormValue: number
}

export interface ICmidVectorDiagramRadarOptions {
    circlePosition: {
        x: number,
        y: number
    },
    circleInnerColor: string,
    circleBorder: string,
    circleBorder2: string,
    lineColor: string,
    rectFactColor: string,
    rectNormColor: string,
    pointRadius: number,
}

export interface ICmidRadarDataOptions {
    textTransform: string,
    valueTransform: string,
    textWidth: string
}
