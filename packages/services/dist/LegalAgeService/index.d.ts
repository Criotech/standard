import { LegalAgeRange } from "./LegalAgeRange";
declare const LegalAgeService: {
    getLegalAgeRange: (birthMonth?: number, birthYear?: number) => LegalAgeRange;
};
export default LegalAgeService;
