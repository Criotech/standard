import { CarouselBanner } from "./CarouselBanner";
import { CampaignBanner } from "./CampaignBanner";

export type GetBannersResponse = {
	banners: CarouselBanner[];
	campaign: CampaignBanner;
};
