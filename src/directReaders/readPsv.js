import readData from '../readers/readData';
import parserPsv from '../parsers/psv';

/**
 * Asynchronously read a pipe-separated value file. Returns an empty array if file is empty.
 *
 * @function readPsv
 * @param {String} filePath Input file path
 * @param {Function|Object} [parserOptions] Optional map function or an object specifying the optional options below.
 * @param {Function} [parserOptions.map] Map function. Called once for each row if your file is an array (it tests if the first non-whitespace character is a `[`) with a callback signature `(row, i)` and delegates to `_.map`. Otherwise it's considered an object and the callback the signature is `(value, key)` and delegates to `_.mapObject`. See example below.
 * @param {Boolean} [parserOptions.trim=true] Trim any whitespace from the file before parsing. Default is true.
 * @param {Function} callback Has signature `(err, data)`
 *
 * @example
 * io.readPsv('path/to/data.psv', function (err, data) {
 *   console.log(data) // Json data
 * })
 *
 * // Transform values on load
 * io.readPsv('path/to/data.psv', function (row, i, columns) {
 *     console.log(columns) // [ 'name', 'occupation', 'height' ]
 *     row.height = +row.height // Convert this value to a number
 *     return row
 * }, function (err, data) {
 *   console.log(data) // Json data with casted values
 * })
 */
export default function readPsv(filePath, opts_, cb) {
	let parserOptions;
	if (typeof cb === 'undefined') {
		cb = opts_;
	} else {
		parserOptions = typeof opts_ === 'function' ? { map: opts_ } : opts_;
	}
	readData(filePath, { parser: parserPsv, parserOptions }, cb);
}
