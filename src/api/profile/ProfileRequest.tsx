export class ProfileRequest {
    name: string = '';
    dob: string = '';
    phone: string = '';
    gender: string = '';
    location: string = '';
    emirates: string = '';
    nationality: string = '';
    occupation: string = '';
    interest: string = '';
    referred_by: string = '';
    image: Image = new Image();
  }

  export class Image {
    fileCopyUri: string = '';
    name: string = '';
    size: string = '';
    type: string = '';
    uri: string = '';
  }
  