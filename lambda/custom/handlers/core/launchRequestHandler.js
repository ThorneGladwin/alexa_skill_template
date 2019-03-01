const langHelper = require("../../helpers/languageHelperFunctions");

module.exports = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "LaunchRequest";
  },
  handle(handlerInput) {
    const speechOutput = langHelper.resourceData(handlerInput).CoreIntents;

    return handlerInput.responseBuilder
      .speak(speechOutput.LaunchRequest.OutputSpeech)
      .reprompt(speechOutput.LaunchRequest.RepromptSpeech)
      .getResponse();
  }
};
