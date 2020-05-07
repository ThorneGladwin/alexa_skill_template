const langHelper = require("../../helpers/languageHelperFunctions");

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    const speechOutput = langHelper.resourceData(handlerInput).CoreIntents;
    console.error(error.message);

    return handlerInput.responseBuilder
      .speak(speechOutput.ErrorHandlerRequest.OutputSpeech)
      .withShouldEndSession(true)
      .getResponse();
  }
};

module.exports = {
  ErrorHandler
};
