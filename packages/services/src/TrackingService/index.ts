import { getConfig } from "../ConfigService";
import {
	FormType,
	IPageViewEvent,
	SelectStoreType,
	SearchStoreType,
	TrackingEvent,
} from "./types";

declare global {
	interface Window {
		dataLayer: { push: (event: TrackingEvent) => void };
	}
}

function pageView(
	event: IPageViewEvent["page_data"],
	user: IPageViewEvent["user_data"]
) {
	window.dataLayer = window.dataLayer || [];
	window.dataLayer.push({ page_data: null, user_data: null });
	window.dataLayer.push({
		event: "page_view",
		page_data: event,
		user_data: user || "not set",
	});
}

function formView(name: FormType) {
	window.dataLayer = window.dataLayer || [];
	window.dataLayer.push({ event_data: null });
	window.dataLayer.push({
		event: "form_view",
		event_data: {
			name,
		},
	});
}

function formStart(name: FormType) {
	window.dataLayer = window.dataLayer || [];
	window.dataLayer.push({ event_data: null });
	window.dataLayer.push({
		event: "form_start",
		event_data: {
			name,
		},
	});
}

function formError(name: FormType, error_message: string) {
	window.dataLayer = window.dataLayer || [];
	window.dataLayer.push({ event_data: null });
	window.dataLayer.push({
		event: "form_error",
		event_data: {
			name,
			error_message,
		},
	});
}

function storeSearch({
	state_field,
	suburb_field,
	find_field,
}: SearchStoreType) {
	window.dataLayer = window.dataLayer || [];
	window.dataLayer.push({ event_data: null });
	window.dataLayer.push({
		event: "search_store",
		event_data: {
			state_field,
			suburb_field,
			find_field,
		},
	});
}
function formComplete(name: FormType, user: IPageViewEvent["user_data"]) {
	window.dataLayer = window.dataLayer || [];
	window.dataLayer.push({ event_data: null });
	window.dataLayer.push({
		event: "form_complete",
		event_data: { name },
		user_data: user || "not set",
	});
}

function storeSelect({ store_name, store_address }: SelectStoreType) {
	window.dataLayer = window.dataLayer || [];
	window.dataLayer.push({ event_data: null });
	window.dataLayer.push({
		event: "select_store",
		event_data: {
			store_name,
			store_address,
		},
	});
}

function register() {
	const config = getConfig();
	if (config && config.tracking) {
		const { gtmId, dataLayerName } = config.tracking;
		const scriptContent = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','${dataLayerName}','${gtmId}');`;
		const script = document.createElement("script");
		script.innerHTML = scriptContent;
		document.head.appendChild(script);
	}
}

const TrackingService = {
	pageView,
	register,
	formView,
	formStart,
	formError,
	storeSearch,
	formComplete,
	storeSelect,
};

export default TrackingService;
