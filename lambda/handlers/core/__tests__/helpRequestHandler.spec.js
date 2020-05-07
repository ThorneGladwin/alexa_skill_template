const HelpRequestHandler = require("../helpRequestHandler");
let helpRequest = require("./requests/help.json");

describe("HelpRequestHandler", () => {
  describe("canHandle", () => {
    it("canHandle returns true with AMAZON.HelpIntent", () => {
      const result = HelpRequestHandler.canHandle(helpRequest);

      expect(result).toBe(true);
    });

    it("canHandle returns false with another intent", () => {
      const mockRequest = {
        ...helpRequest,
        requestEnvelope: {
          ...helpRequest.requestEnvelope,
          request: {
            ...helpRequest.requestEnvelope.request,
            type: "AnotherIntent"
          }
        }
      };

      const result = HelpRequestHandler.canHandle(mockRequest);

      expect(result).toBe(false);
    });
  });

  describe("handle", () => {
    helpRequest.responseBuilder = {
      speak: jest.fn().mockImplementation(function mock() {
        return this;
      }),
      reprompt: jest.fn().mockImplementation(function mock() {
        return this;
      }),
      getResponse: jest.fn().mockImplementation(function mock() {
        return this;
      })
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("Calls expected functions within ResponseBuilder for a Help Request", () => {
      HelpRequestHandler.handle(helpRequest);

      expect(helpRequest.responseBuilder.speak).toHaveBeenCalledTimes(1);
      expect(helpRequest.responseBuilder.reprompt).toHaveBeenCalledTimes(1);
      expect(helpRequest.responseBuilder.getResponse).toHaveBeenCalledTimes(1);
    });
  });
});
