export type TripDetailsResponse ={
    status: number;
    data: TripListResponse;
    total_count: number;
    total_page: number;
}

export type TripListResponse = {
    id:                 number;
    title:              string;
    city:               string;
    area_details:       string;
    details_place:      string;
    longitude:          string;
    latitude:           string;
    level:              string;
    capacity:           string;
    date:               string;
    start_time:         string;
    finish_time:        string;
    joining_start_date: string;
    joining_deadline:   string;
    description:        string;
    passenger:          number;
    image:              null | string;
    user_id:            number;
    deleted_at:         null;
    created_at:         string;
    updated_at:         string;
    trip_status:        string;
    user:               User;
    meeting_time:       string;
    trip_book_count:    number;
    trip_images:        TripImage[];
    trip_book:          TripBook
}

export type TripBook = {
    id:                 number;
    trip_id:            number;
    user_id:            number;
    application_status: string;
    applied_date:       Date;
    created_at:         Date;
    updated_at:         Date;
    name:               string;
    gender:             string;
    phone:              string;
    vehicle:            string;
    passenger:          number;
}

export type TripImage = {
    id:         number;
    trip_id:    number;
    image:      string;
    created_at: string;
    updated_at: string;
}

export type User = {
    id:                number;
    name:              string;
    email:             string;
    email_verified_at: string;
    created_at:        string;
    updated_at:        string;
    nick_name:         null;
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
    fcm_token:         null;
}
