"use strict";
/**
 * <caption>LogLevel.INFO</caption> - The Information level is typically used to output information that is useful to the running and management of your system. Information would also be the level used to log Entry and Exit points in key areas of your application. However, you may choose to add more entry and exit points at Debug level for more granularity during development and testing.
 *
 * LogLevel.WARN - Warning is often used for handled 'exceptions' or other important log events. For example, if your application requires a configuration setting but has a default in case the setting is missing, then the Warning level should be used to log the missing configuration setting.
 *
 * LogLevel.DEBUG
 *
 * LogLevel.ERROR - Error is used to log all unhandled exceptions. This is typically logged inside a catch block at the boundary of your application.
 *
 * LogLevel.FATAL - Fatal is reserved for special exceptions/conditions where it is imperative that you can quickly pick out these events. I normally wouldn't expect Fatal to be used early in an application's development. It's usually only with experience I can identify situations worthy of the FATAL moniker experience do specific events become worth of promotion to Fatal. After all, an error's an error.
 *
 *
 * @enum {number}
 */
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["INFO"] = 0] = "INFO";
    LogLevel[LogLevel["WARN"] = 1] = "WARN";
    LogLevel[LogLevel["DEBUG"] = 2] = "DEBUG";
    LogLevel[LogLevel["ERROR"] = 3] = "ERROR";
    LogLevel[LogLevel["CRITICAL"] = 4] = "CRITICAL";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
/**
 * Logging is a means of tracking events that happen when some software runs. Logging is added to code to indicate that certain events have occurred. An event is described by a descriptive message which can optionally contain variable data(like event is starting or finished.
 * Logger Class
 *
 * @export
 * @class Logger
 * @tutorial gettting-started
 */
var Logger = (function () {
    function Logger() {
    }
    /**
     * Logs messages
     *
     * @param {logLevel} level
     * @param {Message} message
     * @param {boolean} [shouldLogRemotely=false]
     *
     * @example <caption> Normal Usage </caption>
     * Logger.log(LogLevel.CRITICAL, "printing critical message" );
     * Logger.log(LogLevel.ERROR, "printing error message");
     * Logger.log(LogLevel.INFO, "printing informational message");
     * Logger.log(LogLevel.WARN, "printing warning message");
     *
     * @example <caption> Log exceptions remotely </caption>
     *
     *
     * @memberOf Logger
     */
    Logger.log = function (level, message, shouldLogRemotely) {
        if (shouldLogRemotely === void 0) { shouldLogRemotely = false; }
        if (level >= this.currentLevel) {
            if (typeof message === "function") {
                this.logger(message(), level, this.remote_url, shouldLogRemotely);
            }
            else if (typeof message === "string") {
                this.logger(message, level, this.remote_url, shouldLogRemotely);
            }
        }
    };
    return Logger;
}());
Logger.currentLevel = LogLevel.INFO;
Logger.remote_url = '';
Logger.logger = function (value, level, remoteURL, shouldLogRemotely) {
    if (!shouldLogRemotely) {
        if ((level === LogLevel.CRITICAL) || (level === LogLevel.ERROR)) {
            
        }
        else if (level === LogLevel.INFO) {
            console.info(value);
        }
        else if (level === LogLevel.WARN) {
            
        }
    }
    else {
    }
};
exports.Logger = Logger;
//# sourceMappingURL=app.logger.js.map