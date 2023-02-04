import { Region } from "../ConfigService";
export interface IUserAddress {
    line1: string;
    line2: string;
    line3: string;
    city: string;
    state: string;
    postCode: string;
    countryCode: Region;
}
