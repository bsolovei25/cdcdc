

export interface NewUserSettings {
  userId: number;
  screenId: number;
  userGrid: NewUserGrid[];
}

export interface User{
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  phone: string;
}

export interface ScreenSettings {
  id: number;
  user: User[];
  screenName: string;
  updateScreen: boolean;
  widgets: NewUserGrid[];
}


export interface NewUserGrid{
  posX: number;
  posY: number;
  sizeX: number;
  sizeY: number;
  widgetId: string;
  widgetType: string;
  uniqueId: string;
}




