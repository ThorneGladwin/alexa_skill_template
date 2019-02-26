const CoreIntents = {
  LaunchRequest: {
    OutputSpeech: "Welcome to the Alexa Skill Template test skill. This is your welcoming speech.",
    RepromptSpeech: "This is your reprompt speech for your launch request."
  },
  HelpRequest: {
    OutputSpeech: "This is your help speech.",
    RepromptSpeech: "This is your reprompt for your help speech."
  },
  ExitRequest: {
    OutputSpeech: "This is your exit speech."
  },
  SessionEndedRequest: {
    OutputSpeech: "This is your session ended speech."
  },
  FallbackHandlerRequest: {
    OutputSpeech: "This is your fallback speech",
    RepromptSpeech: "This is your reprompt for your fallback speech."
  },
  ErrorHandlerRequest: {
    OutputSpeech: "This is your error handler speech."
  }
};

module.exports = {
  CoreIntents
};
