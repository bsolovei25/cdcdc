import { IEquipmentState, IEquipmentStateSelectionList } from "@dashboard/models/EVJ/equipment-state";

export const tableDataMock: IEquipmentState[] = [
  {
    state: 'on', // bool ?
    name: 'K_DBL_LTI796',
    position: 'H-1',
    equipmentType: 'dynamic',
    equipmentGroup: 'Насосное оборудование',
    status: 'work',
    dateStart: '2021-06-02T12:00:00Z',
    dateEnd: '2022-07-03T14:22:22Z',
    comment: {
      avatar: 'assets/pic/avatar_temp.jpg',
      name: 'Петрович С.П.',
      position: 'Старший оператор',
      message: '',
      date: '2021-06-02 16:00'
    }
  },
  {
    state: 'off',
    name: 'K_DBL_KDI723',
    position: 'H-2',
    equipmentType: 'static',
    equipmentGroup: 'Насосное оборудование',
    status: 'repair',
    dateStart: '2021-06-02T12:00:00Z',
    dateEnd: '2022-07-03T14:22:22Z',
    comment: {
      avatar: 'assets/pic/avatar_temp.jpg',
      name: 'Геннадьевич А.Б.',
      position: 'Младший оператор',
      message: 'Нужна замена масла в котле СВТ-23, с последующей очисткой',
      date: '2021-06-02 16:00'
    }
  },
  {
    state: 'undetermined',
    name: 'K_DBL_LTI796',
    position: 'H-1',
    equipmentType: 'dynamic',
    equipmentGroup: 'Насосное оборудование',
    status: 'defective',
    dateStart: '2021-06-02T12:00:00Z',
    dateEnd: '2022-07-03T14:22:22Z',
    comment: {
      avatar: 'assets/pic/avatar_temp.jpg',
      name: 'Петрович С.П.',
      position: 'Старший оператор',
      message: 'Требуется плановая замена основного подшипника насоса с учетом технических характеристик его работы.',
      date: '2021-06-02 16:00'
    }
  },
  {
    state: 'undetermined',
    name: 'K_APS_SDJ231',
    position: 'OMSK-4',
    equipmentType: 'static',
    equipmentGroup: 'Насосное оборудование',
    status: 'inactive',
    dateStart: '2021-06-02T12:00:00Z',
    dateEnd: '2022-07-03T14:22:22Z',
    comment: {
      avatar: 'assets/pic/avatar_temp.jpg',
      name: 'Геннадьевич А.Б.',
      position: 'Младший оператор',
      message: 'Внеплановая замена поршня ШТЛ-44, требуется помощь мастера.',
      date: '2021-06-02 16:00'
    }
  },
  {
    state: 'on',
    name: 'K_APS_SDJ231',
    position: 'OMSK-4',
    equipmentType: 'static',
    equipmentGroup: 'Насосное оборудование',
    status: 'inactive',
    dateStart: '2021-06-02T12:00:00Z',
    dateEnd: '2022-07-03T14:22:22Z',
    comment: {
      avatar: 'assets/pic/avatar_temp.jpg',
      name: 'Геннадьевич А.Б.',
      position: 'Младший оператор',
      message: 'Очень длинное сообщение от мастера, требующее срочного решения. Очень длинное сообщение от мастера, требующее срочного решения. Очень длинное сообщение от мастера, требующее срочного решения. Очень длинное сообщение от мастера, требующее срочного решения. Очень длинное сообщение от мастера, требующее срочного решения. Очень длинное сообщение от мастера, требующее срочного решения.',
      date: '2021-06-02 16:00'
    }
  },
  {
    state: 'on',
    name: 'K_DBL_LTI796',
    position: 'H-1',
    equipmentType: 'dynamic',
    equipmentGroup: 'Другое оборудование',
    status: 'work',
    dateStart: '2021-06-02T12:00:00Z',
    dateEnd: '2022-07-03T14:22:22Z',
    comment: {
      avatar: 'assets/pic/avatar_temp.jpg',
      name: 'Петрович С.П.',
      position: 'Старший оператор',
      message: 'Требуется оперативная замена покрышек на установке H-1',
      date: '2021-06-02 16:00'
    }
  },
  {
    state: 'off',
    name: 'K_DBL_KDI723',
    position: 'H-2',
    equipmentType: 'static',
    equipmentGroup: 'Другое оборудование',
    status: 'repair',
    dateStart: '2021-06-02T12:00:00Z',
    dateEnd: '2022-07-03T14:22:22Z',
    comment: {
      avatar: 'assets/pic/avatar_temp.jpg',
      name: 'Геннадьевич А.Б.',
      position: 'Младший оператор',
      message: 'Нужна замена масла в котле СВТ-23, с последующей очисткой',
      date: '2021-06-02 16:00'
    }
  },
  {
    state: 'undetermined',
    name: 'K_DBL_LTI796',
    position: 'H-1',
    equipmentType: 'dynamic',
    equipmentGroup: 'Другое оборудование',
    status: 'defective',
    dateStart: '2021-06-02T12:00:00Z',
    dateEnd: '2022-07-03T14:22:22Z',
    comment: {
      avatar: 'assets/pic/avatar_temp.jpg',
      name: 'Петрович С.П.',
      position: 'Старший оператор',
      message: 'Требуется плановая замена основного подшипника насоса с учетом технических характеристик его работы.',
      date: '2021-06-02 16:00'
    }
  },
  {
    state: 'undetermined',
    name: 'K_APS_SDJ231',
    position: 'OMSK-4',
    equipmentType: 'static',
    equipmentGroup: 'Другое оборудование',
    status: 'inactive',
    dateStart: '2021-06-02T12:00:00Z',
    dateEnd: '2022-07-03T14:22:22Z',
    comment: {
      avatar: 'assets/pic/avatar_temp.jpg',
      name: 'Геннадьевич А.Б.',
      position: 'Младший оператор',
      message: 'Внеплановая замена поршня ШТЛ-44, требуется помощь мастера.',
      date: '2021-06-02 16:00'
    }
  },
  {
    state: 'on',
    name: 'K_APS_SDJ231',
    position: 'OMSK-4',
    equipmentType: 'static',
    equipmentGroup: 'Другое оборудование',
    status: 'inactive',
    dateStart: '2021-06-02T12:00:00Z',
    dateEnd: '2022-07-03T14:22:22Z',
    comment: {
      avatar: 'assets/pic/avatar_temp.jpg',
      name: 'Геннадьевич А.Б.',
      position: 'Младший оператор',
      message: 'Очень длинное сообщение от мастера, требующее срочного решения. Очень длинное сообщение от мастера, требующее срочного решения. Очень длинное сообщение от мастера, требующее срочного решения. Очень длинное сообщение от мастера, требующее срочного решения. Очень длинное сообщение от мастера, требующее срочного решения. Очень длинное сообщение от мастера, требующее срочного решения.',
      date: '2021-06-02 16:00'
    }
  },
  {
    state: 'on',
    name: 'K_DBL_LTI796',
    position: 'H-1',
    equipmentType: 'dynamic',
    equipmentGroup: 'Другое оборудование',
    status: 'work',
    dateStart: '2021-06-02T12:00:00Z',
    dateEnd: '2022-07-03T14:22:22Z',
    comment: {
      avatar: 'assets/pic/avatar_temp.jpg',
      name: 'Петрович С.П.',
      position: 'Старший оператор',
      message: 'Требуется оперативная замена покрышек на установке H-1',
      date: '2021-06-02 16:00'
    }
  },
  {
    state: 'off',
    name: 'K_DBL_KDI723',
    position: 'H-2',
    equipmentType: 'static',
    equipmentGroup: 'Другое оборудование',
    status: 'repair',
    dateStart: '2021-06-02T12:00:00Z',
    dateEnd: '2022-07-03T14:22:22Z',
    comment: {
      avatar: 'assets/pic/avatar_temp.jpg',
      name: 'Геннадьевич А.Б.',
      position: 'Младший оператор',
      message: 'Нужна замена масла в котле СВТ-23, с последующей очисткой',
      date: '2021-06-02 16:00'
    }
  },
  {
    state: 'undetermined',
    name: 'K_DBL_LTI796',
    position: 'H-1',
    equipmentType: 'dynamic',
    equipmentGroup: 'Другое оборудование',
    status: 'defective',
    dateStart: '2021-06-02T12:00:00Z',
    dateEnd: '2022-07-03T14:22:22Z',
    comment: {
      avatar: 'assets/pic/avatar_temp.jpg',
      name: 'Петрович С.П.',
      position: 'Старший оператор',
      message: 'Требуется плановая замена основного подшипника насоса с учетом технических характеристик его работы.',
      date: '2021-06-02 16:00'
    }
  },
  {
    state: 'undetermined',
    name: 'K_APS_SDJ231',
    position: 'OMSK-4',
    equipmentType: 'static',
    equipmentGroup: 'Другое оборудование',
    status: 'inactive',
    dateStart: '2021-06-02T12:00:00Z',
    dateEnd: '2022-07-03T14:22:22Z',
    comment: {
      avatar: 'assets/pic/avatar_temp.jpg',
      name: 'Геннадьевич А.Б.',
      position: 'Младший оператор',
      message: 'Внеплановая замена поршня ШТЛ-44, требуется помощь мастера.',
      date: '2021-06-02 16:00'
    }
  },
  {
    state: 'on',
    name: 'K_APS_SDJ231',
    position: 'OMSK-4',
    equipmentType: 'static',
    equipmentGroup: 'Другое оборудование',
    status: 'inactive',
    dateStart: '2021-06-02T12:00:00Z',
    dateEnd: '2022-07-03T14:22:22Z',
    comment: {
      avatar: 'assets/pic/avatar_temp.jpg',
      name: 'Геннадьевич А.Б.',
      position: 'Младший оператор',
      message: 'Очень длинное сообщение от мастера, требующее срочного решения. Очень длинное сообщение от мастера, требующее срочного решения. Очень длинное сообщение от мастера, требующее срочного решения. Очень длинное сообщение от мастера, требующее срочного решения. Очень длинное сообщение от мастера, требующее срочного решения. Очень длинное сообщение от мастера, требующее срочного решения.',
      date: '2021-06-02 16:00'
    }
  },
  {
    state: 'on',
    name: 'K_DBL_LTI796',
    position: 'H-1',
    equipmentType: 'dynamic',
    equipmentGroup: 'Другое оборудование',
    status: 'work',
    dateStart: '2021-06-02T12:00:00Z',
    dateEnd: '2022-07-03T14:22:22Z',
    comment: {
      avatar: 'assets/pic/avatar_temp.jpg',
      name: 'Петрович С.П.',
      position: 'Старший оператор',
      message: 'Требуется оперативная замена покрышек на установке H-1',
      date: '2021-06-02 16:00'
    }
  },
  {
    state: 'off',
    name: 'K_DBL_KDI723',
    position: 'H-2',
    equipmentType: 'static',
    equipmentGroup: 'Другое оборудование',
    status: 'repair',
    dateStart: '2021-06-02T12:00:00Z',
    dateEnd: '2022-07-03T14:22:22Z',
    comment: {
      avatar: 'assets/pic/avatar_temp.jpg',
      name: 'Геннадьевич А.Б.',
      position: 'Младший оператор',
      message: 'Нужна замена масла в котле СВТ-23, с последующей очисткой',
      date: '2021-06-02 16:00'
    }
  },
  {
    state: 'undetermined',
    name: 'K_DBL_LTI796',
    position: 'H-1',
    equipmentType: 'dynamic',
    equipmentGroup: 'Другое оборудование',
    status: 'defective',
    dateStart: '2021-06-02T12:00:00Z',
    dateEnd: '2022-07-03T14:22:22Z',
    comment: {
      avatar: 'assets/pic/avatar_temp.jpg',
      name: 'Петрович С.П.',
      position: 'Старший оператор',
      message: 'Требуется плановая замена основного подшипника насоса с учетом технических характеристик его работы.',
      date: '2021-06-02 16:00'
    }
  },
  {
    state: 'undetermined',
    name: 'K_APS_SDJ231',
    position: 'OMSK-4',
    equipmentType: 'static',
    equipmentGroup: 'Другое оборудование',
    status: 'inactive',
    dateStart: '2021-06-02T12:00:00Z',
    dateEnd: '2022-07-03T14:22:22Z',
    comment: {
      avatar: 'assets/pic/avatar_temp.jpg',
      name: 'Геннадьевич А.Б.',
      position: 'Младший оператор',
      message: 'Внеплановая замена поршня ШТЛ-44, требуется помощь мастера.',
      date: '2021-06-02 16:00'
    }
  },
  {
    state: 'on',
    name: 'K_APS_SDJ231',
    position: 'OMSK-4',
    equipmentType: 'static',
    equipmentGroup: 'Другое оборудование',
    status: 'inactive',
    dateStart: '2021-06-02T12:00:00Z',
    dateEnd: '2022-07-03T14:22:22Z',
    comment: {
      avatar: 'assets/pic/avatar_temp.jpg',
      name: 'Геннадьевич А.Б.',
      position: 'Младший оператор',
      message: 'Очень длинное сообщение от мастера, требующее срочного решения. Очень длинное сообщение от мастера, требующее срочного решения. Очень длинное сообщение от мастера, требующее срочного решения. Очень длинное сообщение от мастера, требующее срочного решения. Очень длинное сообщение от мастера, требующее срочного решения. Очень длинное сообщение от мастера, требующее срочного решения.',
      date: '2021-06-02 16:00'
    }
  }
];

export const selectionListDynamic: IEquipmentStateSelectionList = {
  productionList: ['Производство 1 (дин.)', 'Производство 2 (дин.)', 'Производство 3 (дин.)'],
  plantList: ['АВТ-10 (дин.)', 'АВТ-20 (дин.)', 'KLC-1397 (дин.)']
};

export const selectionListStatic: IEquipmentStateSelectionList = {
  productionList: ['Производство 1 (стат.)', 'Производство 2 (стат.)', 'Производство 3 (стат.)'],
  plantList: ['АВТ-10 (стат.)', 'АВТ-20 (стат.)', 'KLC-1397 (стат.)']
};

export const equipmentListMock: string[] = ['Насосное оборудование', 'Другое оборудование', 'Очищающее оборудование'];
