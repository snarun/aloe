export declare const isFunction: (x: any) => boolean;
/**
 * Verifies whether the object is mutable.
 *
 * @export
 * @param {any} target
 * @returns target
 */
export declare function isMutableObject(target: any): boolean;
/**
 * Iterates through the object array
 *
 * @export
 * @param {any} f
 * @param {any} o
 */
export declare function eachObject(f: any, o: any): void;
/**
 * Assigns, source to targets
 *
 * @export
 * @param {any} target
 * @param {any} source
 * @returns target
 */
export declare function assign(target: any, ...source: any[]): any;
