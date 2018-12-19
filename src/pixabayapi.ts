export type TPixabayImage = {
  id:number,
  tags:string,
  largeImageURL:string,
  user:string,
}
export interface IPixabayAPI {
  queryImagesFromPixabay(searchText:string,numberofImagesToGet:number): Promise<TPixabayImage[]>
}