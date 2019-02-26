const langHelper = require("../../helpers/languageHelperFunctions");

module.exports = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "SessionEndedRequest";
  },
  handle(handlerInput) {
    const speechOutput = langHelper.resourceData(handlerInput).CoreIntents;

    return handlerInput.responseBuilder
      .speak(speechOutput.SessionEndedRequest.OutputSpeech)
      .withShouldEndSession(true)
      .getResponse();
  }
};
