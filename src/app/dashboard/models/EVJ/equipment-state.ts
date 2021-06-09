export interface IEquipmentState {
    state: string;
    name: string;
    position: string;
    equipmentType: string;
    equipmentGroup: string;
    status: string;
    dateStart: string;
    dateEnd: string;
    comment?: IEquipmentStateComment;
    isSelected?: boolean;
    isHighlighted?: boolean;
    isEdit?: boolean;
}

export interface IEquipmentStateComment {
    avatar: any;
    name: string;
    position: string;
    message: string;
    date: string;
}

export interface IEquipmentStateSelectionList {
    productionList: string[];
    plantList: string[];
}

export interface IEquipmentStateSelection {
    type: string;
    plant: string;
}
