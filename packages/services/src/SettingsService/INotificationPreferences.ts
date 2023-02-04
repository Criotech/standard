export type INotificationPreferences = {
	marketing?: {
		callEnabled?: boolean;
		emailEnabled?: boolean;
		smsEnabled?: boolean;
		pushEnabled?: boolean;
		lineEnabled?: boolean;
	};
};
