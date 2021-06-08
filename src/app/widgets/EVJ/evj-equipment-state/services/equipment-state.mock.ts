import { IEquipmentState } from "@dashboard/models/EVJ/equipment-state";

export const tableDataMock: IEquipmentState[] = [
  {
    state: 'on', // bool
    name: 'K_DBL_LTI796',
    position: 'H-1',
    equipmentType: 'dynamic',
    // equipmentGroup: ''
    status: 'work',
    dateStart: '2021-06-02T12:00:00Z',
    dateEnd: '2022-07-03T14:22:22Z',
    comment: {
      avatar: 'assets/pic/yoba.png',
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
    status: 'repair',
    dateStart: '2021-06-02T12:00:00Z',
    dateEnd: '2022-07-03T14:22:22Z',
    comment: {
      avatar: 'assets/pic/yoba.png',
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
    status: 'defective',
    dateStart: '2021-06-02T12:00:00Z',
    dateEnd: '2022-07-03T14:22:22Z',
    comment: {
      avatar: 'assets/pic/yoba.png',
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
    status: 'inactive',
    dateStart: '2021-06-02T12:00:00Z',
    dateEnd: '2022-07-03T14:22:22Z',
    comment: {
      avatar: 'assets/pic/yoba.png',
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
    status: 'inactive',
    dateStart: '2021-06-02T12:00:00Z',
    dateEnd: '2022-07-03T14:22:22Z',
    comment: {
      avatar: 'assets/pic/yoba.png',
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
    status: 'work',
    dateStart: '2021-06-02T12:00:00Z',
    dateEnd: '2022-07-03T14:22:22Z',
    comment: {
      avatar: 'assets/pic/yoba.png',
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
    status: 'repair',
    dateStart: '2021-06-02T12:00:00Z',
    dateEnd: '2022-07-03T14:22:22Z',
    comment: {
      avatar: 'assets/pic/yoba.png',
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
    status: 'defective',
    dateStart: '2021-06-02T12:00:00Z',
    dateEnd: '2022-07-03T14:22:22Z',
    comment: {
      avatar: 'assets/pic/yoba.png',
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
    status: 'inactive',
    dateStart: '2021-06-02T12:00:00Z',
    dateEnd: '2022-07-03T14:22:22Z',
    comment: {
      avatar: 'assets/pic/yoba.png',
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
    status: 'inactive',
    dateStart: '2021-06-02T12:00:00Z',
    dateEnd: '2022-07-03T14:22:22Z',
    comment: {
      avatar: 'assets/pic/yoba.png',
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
    status: 'work',
    dateStart: '2021-06-02T12:00:00Z',
    dateEnd: '2022-07-03T14:22:22Z',
    comment: {
      avatar: 'assets/pic/yoba.png',
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
    status: 'repair',
    dateStart: '2021-06-02T12:00:00Z',
    dateEnd: '2022-07-03T14:22:22Z',
    comment: {
      avatar: 'assets/pic/yoba.png',
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
    status: 'defective',
    dateStart: '2021-06-02T12:00:00Z',
    dateEnd: '2022-07-03T14:22:22Z',
    comment: {
      avatar: 'assets/pic/yoba.png',
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
    status: 'inactive',
    dateStart: '2021-06-02T12:00:00Z',
    dateEnd: '2022-07-03T14:22:22Z',
    comment: {
      avatar: 'assets/pic/yoba.png',
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
    status: 'inactive',
    dateStart: '2021-06-02T12:00:00Z',
    dateEnd: '2022-07-03T14:22:22Z',
    comment: {
      avatar: 'assets/pic/yoba.png',
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
    status: 'work',
    dateStart: '2021-06-02T12:00:00Z',
    dateEnd: '2022-07-03T14:22:22Z',
    comment: {
      avatar: 'assets/pic/yoba.png',
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
    status: 'repair',
    dateStart: '2021-06-02T12:00:00Z',
    dateEnd: '2022-07-03T14:22:22Z',
    comment: {
      avatar: 'assets/pic/yoba.png',
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
    status: 'defective',
    dateStart: '2021-06-02T12:00:00Z',
    dateEnd: '2022-07-03T14:22:22Z',
    comment: {
      avatar: 'assets/pic/yoba.png',
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
    status: 'inactive',
    dateStart: '2021-06-02T12:00:00Z',
    dateEnd: '2022-07-03T14:22:22Z',
    comment: {
      avatar: 'assets/pic/yoba.png',
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
    status: 'inactive',
    dateStart: '2021-06-02T12:00:00Z',
    dateEnd: '2022-07-03T14:22:22Z',
    comment: {
      avatar: 'assets/pic/yoba.png',
      name: 'Геннадьевич А.Б.',
      position: 'Младший оператор',
      message: 'Очень длинное сообщение от мастера, требующее срочного решения. Очень длинное сообщение от мастера, требующее срочного решения. Очень длинное сообщение от мастера, требующее срочного решения. Очень длинное сообщение от мастера, требующее срочного решения. Очень длинное сообщение от мастера, требующее срочного решения. Очень длинное сообщение от мастера, требующее срочного решения.',
      date: '2021-06-02 16:00'
    }
  }
];

export const productionListMock = ['Производство 1', 'Производство 2', 'Производство 3'];

export const plantListMock = ['АВТ-10', 'АВТ-20', 'KLC-1397'];

export const equipmentListMock = ['Насосное оборудование', 'Другое оборудование', 'Очищающее оборудование'];
