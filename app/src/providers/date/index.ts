import timeFromNow from "./timeFromNow";
import client from "./client";
import getDefaultDateFormat, {
  toNanoseconds,
  now,
  fromNanoseconds,
  toUtcoffsetNanoseconds,
} from "./getDefaultDateFormat";

export default {
  timeFromNow,
  getDefaultDateFormat,
  toNanoseconds,
  fromNanoseconds,
  now,
  client,
  toUtcoffsetNanoseconds,
};
