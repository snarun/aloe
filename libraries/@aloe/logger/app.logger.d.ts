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
export declare enum LogLevel {
    INFO = 0,
    WARN = 1,
    DEBUG = 2,
    ERROR = 3,
    CRITICAL = 4,
}
export declare type MessageFn = () => string;
export declare type Message = MessageFn | string;
/**
 * Logging is a means of tracking events that happen when some software runs. Logging is added to code to indicate that certain events have occurred. An event is described by a descriptive message which can optionally contain variable data(like event is starting or finished.
 * Logger Class
 *
 * @export
 * @class Logger
 * @tutorial gettting-started
 */
export declare class Logger {
    static currentLevel: LogLevel;
    static remote_url: string;
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
    static log(level: LogLevel, message: Message, shouldLogRemotely?: boolean): void;
    static logger: (value: string, level: LogLevel, remoteURL: string, shouldLogRemotely: boolean) => void;
}
