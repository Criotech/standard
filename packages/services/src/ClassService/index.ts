const createClassName = (...args: (string | undefined)[]): string => {
	return args.filter(Boolean).join(" ");
};

const ClassService = {
	createClassName,
};

export default ClassService;
