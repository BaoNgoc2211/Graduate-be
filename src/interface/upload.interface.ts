export interface IUpload {
  uploadSingle(image: string): Promise<string>;
  uploadMultiple(image: string[]): Promise<string[]>;
}
