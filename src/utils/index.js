export const isStringEmpty = (string) => {
  return (
    !string || string === 'null' || String.prototype.trim.call(string) === ''
  );
};


export const combineUrlParams = (url = "", params = {}) => {
    const keys = Object.keys(params);
    const paramUrl = keys
      .reduce(
        (result, key) =>
          params[key] !== undefined &&
          params[key] !== null &&
          params[key] !== "null" &&
          params[key] !== "" &&
          params[key].length !== 0 &&
          params[key][0] !== "" &&
          !(
            typeof params[key] === "object" && // case param = {}
            Object.keys(params[key]).length === 0
          )
            ? [
                ...result,
                `${key}=${
                  key != "sort" ? encodeURIComponent(params[key]) : params[key]
                }`,
              ]
            : [...result],
        []
      )
      .join("&");
    return `${url}${paramUrl ? `?${paramUrl}` : ""}`;
  };
  
  export const combineSort = (params = {}) => {
    const keys = Object.keys(params);
    const paramSort = keys
      .reduce(
        (result, key) =>
          params[key] &&
          params[key] !== undefined &&
          params[key] !== null &&
          params[key] !== ""
            ? [...result, `${key},${params[key] === 1 ? "asc" : "desc"}`]
            : [...result],
        []
      )
      .join("&sort=");
    return paramSort;
  };