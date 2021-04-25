// NOTE: cant be in file with runtime stuff due to `export 'IDestroyedStreamOptions' was not found` webpack warning
export interface IDestroyedStreamOptions {
  destroyMethod?: Function;
}
