export const paramsToQueryString = (params) => {
  const filteredParams = Object.entries(params)
    .filter(([_, value]) => value !== null && value !== undefined)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

  return "?" + new URLSearchParams(filteredParams).toString();
};

// export default paramsToQueryString;
