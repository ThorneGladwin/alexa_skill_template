const FallbackRequestHandler = require("../fallbackRequestHandler");
let fallbackRequest = require("./requests/fallback.json");

describe("FallbackRequestHandler", () => {
  describe("canHandle", () => {
    it("canHandle returns true with AMAZON.FallbackIntent", () => {
      const result = FallbackRequestHandler.canHandle(fallbackRequest);

      expect(result).toBe(true);
    });

    it("canHandle returns false with another intent", () => {
      const mockRequest = {
        ...fallbackRequest,
        requestEnvelope: {
          ...fallbackRequest.requestEnvelope,
          request: {
            ...fallbackRequest.requestEnvelope.request,
            type: "AnotherIntent"
          }
        }
      };

      const result = FallbackRequestHandler.canHandle(mockRequest);

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

    fallbackRequest.responseBuilder = responseBuilder;

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("Calls expected functions within ResponseBuilder for a Fallback Request", () => {
      FallbackRequestHandler.handle(fallbackRequest);

      expect(fallbackRequest.responseBuilder.speak).toHaveBeenCalledTimes(1);
      expect(fallbackRequest.responseBuilder.reprompt).toHaveBeenCalledTimes(1);
      expect(fallbackRequest.responseBuilder.getResponse).toHaveBeenCalledTimes(1);
    });
  });
});
