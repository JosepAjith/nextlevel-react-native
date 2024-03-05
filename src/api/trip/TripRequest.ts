export class TripRequest{
    id: number = 0;
    title: string = '';
    city: string = '';
    area_details: string = '';
    details_place: string = '';
    longitude: string = '';
    latitude: string = '';
    level: string = '';
    capacity: string = '';
    date: string = '';
    meeting_time: string = '';
    start_time: string = '';
    finish_time: string = '';
    joining_start_date: string = '';
    joining_deadline: string = '';
    description: string = '';
    passenger: string = '';
    image: Image[] = [];
  }

  export class Image {
    fileCopyUri: string = '';
    name: string = '';
    size: string = '';
    type: string = '';
    uri: string = '';
  }