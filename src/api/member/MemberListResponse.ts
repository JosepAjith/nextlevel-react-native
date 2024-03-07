export type MemberListResponse = {
    status: number;
    data:   MemberListData[];
}

export type MemberListData = {
    title: string;
    data:  DatumDatum[];
}

export type DatumDatum = {
    id:                number;
    name:              string;
    email:             string;
    email_verified_at: string;
    created_at:        string;
    updated_at:        string;
    nick_name:         null | string;
    phone:             string;
    image:             string;
    type:              string;
    dob:               string;
    gender:            string;
    location:          string;
    emirates:          string;
    nationality:       string;
    occupation:        string;
    interest:          string;
    referred_by:       string;
    user_delete:       number;
    level:             string;
    is_admin:          string;
    fcm_token:         string;
    update_role_time:  number;
    google_id:         number;
    facebook_id:       number;
    attendance_id:     number;
    is_present:        boolean;
    trip_book:         TripBook;
}

export type TripBook = {
    id:                 number;
    trip_id:            number;
    user_id:            number;
    application_status: string;
    applied_date:       string;
    created_at:         string;
    updated_at:         string;
    name:               string;
    gender:             string;
    phone:              string;
    vehicle:            string;
    passenger:          number;
}
