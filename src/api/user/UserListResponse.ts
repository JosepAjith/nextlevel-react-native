export type UserListResponse = {
    status:      number;
    data:        UserListData[];
    total_count: number;
    total_page:  number;
}

export type UserListData = {
    id:                number;
    name:              string;
    email:             string;
    email_verified_at: string | null;
    created_at:        string;
    updated_at:        string;
    nick_name:         null | string;
    phone:             string;
    image:             string;
    type:              string;
    dob:               string | null;
    gender:            null | string;
    location:          null | string;
    emirates:          null | string;
    nationality:       null | string;
    occupation:        null | string;
    interest:          null | string;
    referred_by:       null | string;
    user_delete:       number;
    level:             string;
    is_admin:          string;
    fcm_token:         null | string;
    update_role_time:  string;
    google_id:         null | string;
    facebook_id:       null | string;
}
