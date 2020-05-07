const { ErrorHandler } = require("../index");

let invalidIntentRequest = require("./requests/invalidIntent.json");

describe("ErrorHandler", () => {
  describe("canHandle", () => {
    it("canHandle returns true", () => {
      const result = ErrorHandler.canHandle();

      expect(result).toBe(true);
    });
  });

  describe("handle", () => {
    invalidIntentRequest.responseBuilder = {
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

    it("Calls expected functions within ResponseBuilder", () => {
      const error = {
        message: "This is an error!"
      };
      ErrorHandler.handle(invalidIntentRequest, error);

      expect(invalidIntentRequest.responseBuilder.speak).toHaveBeenCalledTimes(1);
      expect(invalidIntentRequest.responseBuilder.withShouldEndSession).toHaveBeenCalledTimes(1);
      expect(invalidIntentRequest.responseBuilder.getResponse).toHaveBeenCalledTimes(1);
    });
  });
});
