const SessionEndedRequestHandler = require("../sessionEndedRequestHandler");
let sessionEndedRequest = require("./requests/sessionEnded.json");

describe("SessionEndedRequestHandler", () => {
  describe("canHandle", () => {
    it("canHandle returns true with LaunchRequest", () => {
      const result = SessionEndedRequestHandler.canHandle(sessionEndedRequest);

      expect(result).toBe(true);
    });

    it("canHandle returns false with another intent", () => {
      const mockRequest = {
        ...sessionEndedRequest,
        requestEnvelope: {
          ...sessionEndedRequest.requestEnvelope,
          request: {
            ...sessionEndedRequest.requestEnvelope.request,
            type: "AnotherIntent"
          }
        }
      };

      const result = SessionEndedRequestHandler.canHandle(mockRequest);

      expect(result).toBe(false);
    });
  });

  describe("handle", () => {
    sessionEndedRequest.responseBuilder = {
      speak: jest.fn().mockImplementation(function mock() {
        return this;
      }),
      withShouldEndSession: jest.fn().mockImplementation(function mock() {
        return this;
      }),
      getResponse: jest.fn().mockImplementation(function mock() {
        return this;
      })
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("Calls expected functions within ResponseBuilder for a Launch Request", () => {
      SessionEndedRequestHandler.handle(sessionEndedRequest);

      expect(sessionEndedRequest.responseBuilder.speak).toHaveBeenCalledTimes(1);
      expect(sessionEndedRequest.responseBuilder.withShouldEndSession).toHaveBeenCalledTimes(1);
      expect(sessionEndedRequest.responseBuilder.getResponse).toHaveBeenCalledTimes(1);
    });
  });
});
