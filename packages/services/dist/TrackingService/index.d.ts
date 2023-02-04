import { FormType, IPageViewEvent, SelectStoreType, SearchStoreType, TrackingEvent } from "./types";
declare global {
    interface Window {
        dataLayer: {
            push: (event: TrackingEvent) => void;
        };
    }
}
declare function pageView(event: IPageViewEvent["page_data"], user: IPageViewEvent["user_data"]): void;
declare function formView(name: FormType): void;
declare function formStart(name: FormType): void;
declare function formError(name: FormType, error_message: string): void;
declare function storeSearch({ state_field, suburb_field, find_field, }: SearchStoreType): void;
declare function formComplete(name: FormType, user: IPageViewEvent["user_data"]): void;
declare function storeSelect({ store_name, store_address }: SelectStoreType): void;
declare function register(): void;
declare const TrackingService: {
    pageView: typeof pageView;
    register: typeof register;
    formView: typeof formView;
    formStart: typeof formStart;
    formError: typeof formError;
    storeSearch: typeof storeSearch;
    formComplete: typeof formComplete;
    storeSelect: typeof storeSelect;
};
export default TrackingService;
