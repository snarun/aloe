"use strict";
var app_logger_1 = require("./app.logger");
describe("Logger testing suite", function () {
    beforeEach(function () {
    });
    it("should log the value to the console", function () {
        app_logger_1.Logger.log(app_logger_1.LogLevel.CRITICAL, "printing critical message");
        app_logger_1.Logger.log(app_logger_1.LogLevel.ERROR, "printing error message");
        app_logger_1.Logger.log(app_logger_1.LogLevel.INFO, "printing informational message");
        app_logger_1.Logger.log(app_logger_1.LogLevel.WARN, "printing warning message");
        expect(true).toBe(true);
    });
});
//# sourceMappingURL=app.logger.spec.js.map