export type RoleUpgradeResponse = {
    status: number;
    data:   Datum[];
}

export type Datum = {
    user_id:    number;
    user_level: string;
    count:      number;
    user:       User;
}

export type User = {
    id:                     number;
    name:                   string;
    email:                  string;
    email_verified_at:      Date;
    created_at:             null;
    updated_at:             Date;
    nick_name:              string;
    phone:                  string;
    image:                  string;
    type:                   string;
    dob:                    Date;
    gender:                 string;
    location:               string;
    emirates:               string;
    nationality:            string;
    occupation:             string;
    interest:               string;
    referred_by:            string;
    user_delete:            number;
    level:                  string;
    is_admin:               string;
    fcm_token:              string;
    update_role_time:       Date;
    google_id:              string;
    facebook_id:            string;
    reason:                 string;
    degrade_count:          number;
    is_degraded:            number;
    degrade_attending_trip: number;
    joining_date:           null;
    attend_upgrade:         number;
    upgrade_rejected:       number;
}
