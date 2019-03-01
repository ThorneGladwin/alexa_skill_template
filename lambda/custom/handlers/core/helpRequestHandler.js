const langHelper = require("../../helpers/languageHelperFunctions");

module.exports = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;

    return request.type === "IntentRequest" && request.intent.name === "AMAZON.HelpIntent";
  },
  handle(handlerInput) {
    const speechOutput = langHelper.resourceData(handlerInput).CoreIntents;

    return handlerInput.responseBuilder
      .speak(speechOutput.HelpRequest.OutputSpeech)
      .reprompt(speechOutput.HelpRequest.RepromptSpeech)
      .getResponse();
  }
};
