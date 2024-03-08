interface UserData {
    user_id: number;
    trip_id: number;
    is_present: number;
  }
  
  export class AttendanceRequest {
    data: UserData[] = [];
  }