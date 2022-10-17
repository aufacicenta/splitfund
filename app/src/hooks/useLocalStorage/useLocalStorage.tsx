import _ from "lodash";

function get<T>(key: string, type: string = "{}", chain: string = "", fallback?: string | number): T {
  const value = JSON.parse(localStorage.getItem(key) || type);

  if (Array.isArray(value)) {
    return value as unknown as T;
  }

  if (typeof value === "object" && chain) {
    return _.get(value, chain, fallback || "");
  }

  return value;
}

function set<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export const useLocalStorage = () => ({
  set,
  get,
});
