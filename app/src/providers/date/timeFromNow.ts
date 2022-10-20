import moment from "./client";

export const asDefault = (date?: Date | string | number, withoutSuffix?: boolean) =>
  moment(date).fromNow(withoutSuffix);

export const daysToGo = (date?: Date | string | number) => moment(date).diff(moment(), "days");

export const calendar = (date?: Date | string | number) => moment(date).calendar();

export default {
  asDefault,
  calendar,
  daysToGo,
};
