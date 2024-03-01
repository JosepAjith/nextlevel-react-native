export class CarRequest {
    id: number = 0;
    model_name: string = '';
    purchased_year: string = '';
    make: string = '';
    trim: string = '';
    model_series: string = '';
    image: Image = new Image();
  }

  export class Image {
    fileCopyUri: string = '';
    name: string = '';
    size: string = '';
    type: string = '';
    uri: string = '';
  }
  