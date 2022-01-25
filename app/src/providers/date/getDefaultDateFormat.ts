import moment from "moment";

export const now = () => moment();

export const toNanoseconds = (date: number) => date * 1000000;
export const fromNanoseconds = (date: number) => date / 1000000;

export default (date?: Date | string | number) => moment(date || undefined).format("MMM DD, YYYY");
