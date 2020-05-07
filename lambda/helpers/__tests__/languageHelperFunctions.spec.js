const languageHelperFunctions = require("../languageHelperFunctions");
const languages = require("../../resources");
const defaultHandlerInput = {
  requestEnvelope: {
    request: {
      type: "LaunchRequest",
      requestId: "",
      timestamp: "2018-06-01T08:52:30Z",
      locale: "en-GB",
      shouldLinkResultBeReturned: false
    }
  }
};

describe("resourceData", () => {
  it("resourceData returns with default data (en-GB) if request is not specified.", () => {
    const result = languageHelperFunctions.resourceData();

    expect(result).toEqual(languages.enGb.speech);
  });

  it("resourceData returns with default data (en-GB) if locale is not specified.", () => {
    const mockRequest = {
      ...defaultHandlerInput,
      requestEnvelope: {
        ...defaultHandlerInput.requestEnvelope,
        request: {
          ...defaultHandlerInput.requestEnvelope.request,
          locale: undefined
        }
      }
    };
    const result = languageHelperFunctions.resourceData(mockRequest);

    expect(result).toEqual(languages.enGb.speech);
  });

  it("resourceData returns with default data (en-GB) if locale is not present.", () => {
    const mockRequest = {
      ...defaultHandlerInput
    };
    delete mockRequest.requestEnvelope.request.locale;
    const result = languageHelperFunctions.resourceData(mockRequest);

    expect(result).toEqual(languages.enGb.speech);
  });

  it("resourceData returns with default data (en-GB) if locale does not exist.", () => {
    const mockRequest = {
      ...defaultHandlerInput,
      requestEnvelope: {
        ...defaultHandlerInput.requestEnvelope,
        request: {
          ...defaultHandlerInput.requestEnvelope.request,
          locale: "YY-ZZ"
        }
      }
    };
    const result = languageHelperFunctions.resourceData(mockRequest);

    expect(result).toEqual(languages.enGb.speech);
  });

  it("resourceData returns with expected data for en-GB", () => {
    const mockRequest = {
      ...defaultHandlerInput,
      requestEnvelope: {
        ...defaultHandlerInput.requestEnvelope,
        request: {
          ...defaultHandlerInput.requestEnvelope.request,
          locale: "en-GB"
        }
      }
    };
    const result = languageHelperFunctions.resourceData(mockRequest);

    expect(result).toEqual(languages.enGb.speech);
  });
});
