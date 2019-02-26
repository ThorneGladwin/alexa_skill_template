const LaunchRequestHandler = require("../launchRequestHandler");
let launchRequest = require("./requests/launchRequest.json");

describe("LaunchRequestHandler", () => {
  describe("canHandle", () => {
    it("canHandle returns true with LaunchRequest", () => {
      const result = LaunchRequestHandler.canHandle(launchRequest);

      expect(result).toBe(true);
    });

    it("canHandle returns false with another intent", () => {
      const mockRequest = {
        ...launchRequest,
        requestEnvelope: {
          ...launchRequest.requestEnvelope,
          request: {
            ...launchRequest.requestEnvelope.request,
            type: "AnotherIntent"
          }
        }
      };

      const result = LaunchRequestHandler.canHandle(mockRequest);

      expect(result).toBe(false);
    });
  });

  describe("handle", () => {
    const responseBuilder = {
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

    launchRequest.responseBuilder = responseBuilder;

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("Calls expected functions within ResponseBuilder for a Launch Request", () => {
      LaunchRequestHandler.handle(launchRequest);

      expect(launchRequest.responseBuilder.speak).toHaveBeenCalledTimes(1);
      expect(launchRequest.responseBuilder.reprompt).toHaveBeenCalledTimes(1);
      expect(launchRequest.responseBuilder.getResponse).toHaveBeenCalledTimes(1);
    });
  });
});
