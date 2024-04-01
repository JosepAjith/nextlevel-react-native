interface UserData {
  attendance_id: number;
    user_id: number;
    user_name: string;
    trip_id: number;
    is_present: number;
  }
  
  export class AttendanceRequest {
    data: UserData[] = [];
  }