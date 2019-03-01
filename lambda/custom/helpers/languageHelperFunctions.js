const get = require("lodash/get");
const languages = require("../resources");

const globalResourceData = {
  "en-GB": languages.enGb
};

const resourceData = handlerInput => {
  const DEFAULT_LOCALE = "en-GB";
  const locale = get(handlerInput, ["requestEnvelope", "request", "locale"], DEFAULT_LOCALE);
  if (globalResourceData[locale]) {
    return globalResourceData[locale].speech;
  }
  return globalResourceData[DEFAULT_LOCALE].speech;
};

module.exports = {
  resourceData
};
