export type MemberListResponse = {
    status: number;
    data:   MemberListData;
}

export type MemberListData = {
    "support": DATA[];
    "joined":  DATA[];
    "may be":  DATA[];
    "waiting list": DATA[];
}


export type DATA = {
    id:                number;
    name:              string;
    email:             string;
    email_verified_at: string;
    created_at:        string;
    updated_at:        string;
    nick_name:         string;
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
    update_role_time:  string;
    google_id:         number;
    facebook_id:       number;
    attendance_id:     number;
    is_present:        boolean;
}
