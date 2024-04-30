export class TripValidation {
    InvalidImage: boolean = false;
    InvalidTitle: boolean = false;
    InvalidCity: boolean = false;
    InvalidArea: boolean = false;
    InvalidPlace: boolean = false;
    InvalidLevel: boolean = false;
    InvalidCapacity: boolean = false;
    InvalidDate: boolean = false;
    InvalidMeet: boolean = false;
    InvalidStart: boolean = false;
    InvalidFinish: boolean = false;
    InvalidJoinDate: boolean = false;
    InvalidDeadline: boolean = false;
    InvalidDescrip: boolean = false;
    InvalidPassengers: boolean = false;
    error: string = '';
    isDatePickerVisible: boolean = false;
    isMeetPickerVisible: boolean = false;
    isStartPickerVisible: boolean = false;
    isFinishPickerVisible: boolean = false;
    isJoinPickerVisible: boolean = false;
    isDeadlinePickerVisible: boolean = false;
    dateVisible: any = new Date();
  }
  