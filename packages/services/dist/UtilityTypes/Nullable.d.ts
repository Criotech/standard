export declare type Nullable<TInput extends object> = {
    [key in keyof TInput]: TInput[key] | null;
};
