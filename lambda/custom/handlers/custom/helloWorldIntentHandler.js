const langHelper = require("../../helpers/languageHelperFunctions");

module.exports = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;

    return request.type === "IntentRequest" && request.intent.name === "HelloWorldIntent";
  },
  handle(handlerInput) {
    const speechOutput = langHelper.resourceData(handlerInput).HelloWorldIntent;

    return handlerInput.responseBuilder
      .speak(speechOutput.HelpRequest.OutputSpeech)
      .reprompt(speechOutput.HelpRequest.RepromptSpeech)
      .getResponse();
  }
};
