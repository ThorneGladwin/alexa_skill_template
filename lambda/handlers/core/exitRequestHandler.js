const langHelper = require("../../helpers/languageHelperFunctions");

module.exports = {
    canHandle(handlerInput) {
      const request = handlerInput.requestEnvelope.request;
  
      return (
        request.type === "IntentRequest" &&
        (request.intent.name === "AMAZON.CancelIntent" ||
          request.intent.name === "AMAZON.StopIntent")
      );
    },
    handle(handlerInput) {
      const speechOutput = langHelper.resourceData(handlerInput).CoreIntents;
  
      return handlerInput.responseBuilder
        .speak(speechOutput.ExitRequest.OutputSpeech)
        .withShouldEndSession(true)
        .getResponse();
    }
  };