export type NotificationResponse = {
    status: number;
    data:   NotificationData[];
    total_count: number;
    total_page: number;
}

export type NotificationData = {
    created_at:    string;
    date:          string;
    id:            number;
    is_broad_cast: number;
    is_read:       number;
    message:       string;
    trip_id:       number;
    updated_at:    string;
    user_id:       number;
    content:       string;
    ref_id:        number;
}
