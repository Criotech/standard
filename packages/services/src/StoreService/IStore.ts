export interface IStore {
	id: string;
	name: string;
	address: string;
	openingTime: string;
	closingTime: string;
	phone: string;
	isEligibleForHomeDelivery: boolean;
	longitude?: number;
	latitude?: number;
}
