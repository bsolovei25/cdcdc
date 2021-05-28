
export interface ICmidEventChip {
    positionId: string;
    positionName: string;
    positionDescription?: string;
    position?: string;
    piTag?: string;
}


export interface IPlanItem extends ICmidEventChip {
    selected?: boolean;
}
