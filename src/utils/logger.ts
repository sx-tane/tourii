type LogArgs = Array<string | number | boolean | null | undefined | object>;

export const logger = {
	info: (message: string, ...args: LogArgs) => {
		if (process.env.NODE_ENV !== "production") {
			console.info(`[INFO] ${message}`, ...args);
		}
	},
	warn: (message: string, ...args: LogArgs) => {
		if (process.env.NODE_ENV !== "production") {
			console.warn(`[WARN] ${message}`, ...args);
		}
	},
	error: (message: string, ...args: LogArgs) => {
		if (process.env.NODE_ENV !== "production") {
			console.error(`[ERROR] ${message}`, ...args);
		}
	},
};
