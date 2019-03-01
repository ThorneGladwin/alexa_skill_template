const HelloWorldIntentHandler = require("../helloWorldIntentHandler");
let helloWorldRequest = require("./requests/helloWorld.json");

describe("HelloWorldIntentHandler", () => {
  describe("canHandle", () => {
    it("canHandle returns true with HelloWorldIntent", () => {
      const result = HelloWorldIntentHandler.canHandle(helloWorldRequest);

      expect(result).toBe(true);
    });

    it("canHandle returns false with another intent", () => {
      const mockRequest = {
        ...helloWorldRequest,
        requestEnvelope: {
          ...helloWorldRequest.requestEnvelope,
          request: {
            ...helloWorldRequest.requestEnvelope.request,
            type: "AnotherIntent"
          }
        }
      };

      const result = HelloWorldIntentHandler.canHandle(mockRequest);

      expect(result).toBe(false);
    });
  });

  describe("handle", () => {
    helloWorldRequest.responseBuilder = {
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

    it("Calls expected functions within ResponseBuilder for a HelloWorldIntent Request", () => {
      HelloWorldIntentHandler.handle(helloWorldRequest);

      expect(helloWorldRequest.responseBuilder.speak).toHaveBeenCalledTimes(1);
      expect(helloWorldRequest.responseBuilder.reprompt).toHaveBeenCalledTimes(1);
      expect(helloWorldRequest.responseBuilder.getResponse).toHaveBeenCalledTimes(1);
    });
  });
});
