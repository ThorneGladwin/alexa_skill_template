const ExitRequestHandler = require("../exitRequestHandler");
let stopRequest = require("./requests/stop.json");
let cancelRequest = require("./requests/cancel.json");

describe("ExitRequestHandler", () => {
  describe("canHandle", () => {
    it("canHandle returns true with AMAZON.StopIntent", () => {
      const result = ExitRequestHandler.canHandle(stopRequest);

      expect(result).toBe(true);
    });

    it("canHandle returns true with AMAZON.CancelIntent", () => {
      const result = ExitRequestHandler.canHandle(cancelRequest);

      expect(result).toBe(true);
    });

    it("canHandle returns false with another intent", () => {
      const mockStopRequest = {
        ...stopRequest,
        requestEnvelope: {
          ...stopRequest.requestEnvelope,
          request: {
            ...stopRequest.requestEnvelope.request,
            type: "AnotherIntent"
          }
        }
      };
      const mockCancelRequest = {
        ...cancelRequest,
        requestEnvelope: {
          ...cancelRequest.requestEnvelope,
          request: {
            ...cancelRequest.requestEnvelope.request,
            type: "AnotherIntent"
          }
        }
      };
      const stopResult = ExitRequestHandler.canHandle(mockStopRequest);
      const cancelResult = ExitRequestHandler.canHandle(mockCancelRequest);

      expect(stopResult).toBe(false);
      expect(cancelResult).toBe(false);
    });
  });

  describe("handle", () => {
    const responseBuilder = {
      speak: jest.fn().mockImplementation(function mock() {
        return this;
      }),
      getResponse: jest.fn().mockImplementation(function mock() {
        return this;
      }),
      withShouldEndSession: jest.fn().mockImplementation(function mock() {
        return this;
      })
    };

    stopRequest.responseBuilder = responseBuilder;
    cancelRequest.responseBuilder = responseBuilder;
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("Calls expected functions within ResponseBuilder for a Stop Request", () => {
      ExitRequestHandler.handle(stopRequest);

      expect(stopRequest.responseBuilder.speak).toHaveBeenCalledTimes(1);
      expect(stopRequest.responseBuilder.getResponse).toHaveBeenCalledTimes(1);
      expect(stopRequest.responseBuilder.withShouldEndSession).toHaveBeenCalledTimes(1);
    });

    it("Calls expected functions within ResponseBuilder for a Cancel Request", () => {
      ExitRequestHandler.handle(cancelRequest);

      expect(cancelRequest.responseBuilder.speak).toHaveBeenCalledTimes(1);
      expect(cancelRequest.responseBuilder.getResponse).toHaveBeenCalledTimes(1);
      expect(cancelRequest.responseBuilder.withShouldEndSession).toHaveBeenCalledTimes(1);
    });
  });
});
