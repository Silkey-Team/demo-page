
const queryString = require('query-string');

export function queryStringGetter(name) {
  const parsed = queryString.parse(window.location.search);

  if (typeof parsed[name] !== "undefined") {
    return parsed[name]
  }

  if (typeof parsed[name + '[]'] !== "undefined") {
    return parsed[name + '[]']
  }

  return null
}
