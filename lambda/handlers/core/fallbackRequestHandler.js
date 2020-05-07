const langHelper = require("../../helpers/languageHelperFunctions");

module.exports = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;

    return request.type === "IntentRequest" && request.intent.name === "AMAZON.FallbackIntent";
  },
  handle(handlerInput) {
    const speechOutput = langHelper.resourceData(handlerInput).CoreIntents;

    return handlerInput.responseBuilder
      .speak(speechOutput.FallbackHandlerRequest.OutputSpeech)
      .reprompt(speechOutput.FallbackHandlerRequest.RepromptSpeech)
      .getResponse();
  }
};
