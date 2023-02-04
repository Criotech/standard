const createClassName = (...args) => {
    return args.filter(Boolean).join(" ");
};
const ClassService = {
    createClassName,
};
export default ClassService;
