
export interface ICmidEventChip {
    id: string;
    name: string;
    description?: string;
    position?: string;
    piTag?: string;
}


export interface IPlanItem extends ICmidEventChip {
    name: string;
    id: string;
    selected?: boolean;
}
