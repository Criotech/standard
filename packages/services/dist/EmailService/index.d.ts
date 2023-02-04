declare const EmailService: {
    linkAccount: (encodedDeviceToken: string, xiamToken: string) => Promise<void>;
    verify: (data: string) => Promise<void>;
    sendVerificationLink: (xiamToken: string) => Promise<void>;
};
export default EmailService;
