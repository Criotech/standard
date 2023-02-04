declare type EmptyEvent = {
    page_data: null;
    user_data: null;
} | {
    event_data: null;
};
export interface IPageViewEvent {
    event: "page_view";
    page_data: {
        page_name: string;
        page_referrer: string;
        page_title: string;
        page_path: string;
        page_category: string;
        user_login_state: string;
    };
    user_data?: {
        user_id: string;
        user_login_state: string;
    } | "not set";
}
export declare type FormType = "register_phone" | "update_phone" | "otp_verification" | "terms_and_conditions" | "create_profile" | "update_profile" | "update_address" | "update_password" | "update_marketing_preference" | "change_password" | "reset_password" | "sign_in" | "sign_up";
export interface IFormEvent {
    event: "form_view" | "form_start" | "form_complete" | "form_error";
    event_data: {
        name: FormType;
        error_message?: string;
    };
}
export declare type SelectStoreType = {
    store_name: string;
    store_address: string;
};
export interface ISelectStore {
    event: "select_store";
    event_data: SelectStoreType;
}
export declare type SearchStoreType = {
    state_field: string;
    suburb_field: string;
    find_field: string;
};
export interface ISearchField {
    event: "search_store";
    event_data: SearchStoreType;
}
export declare type TrackingEvent = EmptyEvent | IPageViewEvent | IFormEvent | ISelectStore | ISearchField;
export {};
