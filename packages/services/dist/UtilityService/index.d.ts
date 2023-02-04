declare function numbersFromRange(min: number, max: number): number[];
declare function sleep(waitTimeInMilliseconds: number): Promise<void>;
declare const UtilityService: {
    numbersFromRange: typeof numbersFromRange;
    sleep: typeof sleep;
};
export default UtilityService;
