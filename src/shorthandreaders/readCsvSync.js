import readDataSync from '../readers/readDataSync'
import parserCsv from '../parsers/csv'

/**
 * Synchronously read a comma-separated value file. Returns an empty array if file is empty.
 *
 * @function readCsvSync
 * @param {String} fileName the name of the file
 * @param {Function|Object} [map] Optional map function, called once for each row (header row skipped). Has signature `(row, i, columns)`. See example below or d3-dsv documentation for details.
 * @returns {Array} the contents of the file as JSON
 *
 * @example
 * var data = io.readCsvSync('path/to/data.csv')
 * console.log(data) // Json data
 *
 * // Transform values on load
 * var data = io.readCsvSync('path/to/data.csv', function (row, i, columns) {
 *   console.log(columns) // [ 'name', 'occupation', 'height' ]
 *   row.height = +row.height // Convert this value to a number
 *   return row
 * })
 * console.log(data) // Json data with casted values
 */
export default function readCsvSync (path, opts_) {
  var parserOptions
  if (typeof opts_ !== 'undefined') {
    parserOptions = typeof opts_ === 'function' ? {map: opts_} : opts_
  }
  return readDataSync(path, {parser: parserCsv, parserOptions: parserOptions})
}
