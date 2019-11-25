export interface UserSettings {
  userId: number;
  screenId: number;
  userGrid: UserGrid[];
}

export interface UserGrid {
  widgetId: string;
  position: string;
}


export interface NewUserSettings {
  userId: number;
  screenId: number;
  userGrid: NewUserGrid[];
}


export interface NewUserGrid{
  posX: number;
  posY: number;
  sizeX: number;
  sizeY: number;
  widgetId: string;
  widgetType: string;
}




