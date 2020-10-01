export function transformData(data, groupBy, orderBy, asc, inputValue, rows, currentPage, fields) {
    let displayData = [...data]

    //  groupBy transform
    displayData = groupData(data, groupBy, fields)
    // apply transform from fields
    displayData = applyFieldTransformation(displayData, fields)
    // inputValue transform
    displayData = filterDataByInput(displayData, inputValue)
    // orderBy/asc trasnform
    displayData = arrangeData(displayData, orderBy, asc)

    return displayData
}

/**
 *
 * @param {[Object]} data
 * @param {[Object]} fields
 */
export function applyFieldTransformation(data, fields) {
    // save fields to transform
    const hash = {}
    // get transform fields function
    for (let _field of fields) {
        const { transform } = _field
        // transform function exists, add it
        if (transform && transform instanceof Function) {
            hash[_field.propName] = transform
        }
    }

    // if there's no transformations, return
    if (Object.keys(hash).length === 0) return data

    return data.map((rowData) => {
        const _rowData = { ...rowData }

        for (let _propName in hash) {
            _rowData[_propName] = hash[_propName](rowData[_propName], rowData)
        }

        return _rowData
    })
}

/**
 *
 * @param {[Object]} data
 * @param {String} inputValue
 */
export function filterDataByInput(data, inputValue) {
    return data.filter((item, index) => {
        // map throught each field
        for (let _field in item) {
            // stringify field value
            // check for substring
            // if exists, add object to new array
            if (item[_field] && JSON.stringify(item[_field]).toLowerCase().includes(inputValue.toLowerCase()))
                return true
        }
        return false
    })
}

/**
 *
 * @param {[Object]} data
 * @param {[String]} groupBy
 * @param {[Object]} fields
 */
export function groupData(data, groupBy) {
    // don't mutate groupBy array (bad idea lol)
    const _groupBy = [...groupBy]

    // first group
    let group = _groupBy[0]
    if (!group) return data

    const { propName, displayName } = group
    const hashValues = {}

    data.forEach((curr) => {
        // extract current value
        const currentValue = curr[propName]
        // current value has key on hash map?
        if (!hashValues[currentValue])
            // if it doesn't, create new object with the data that we need
            // initialize data array []
            // hashValues[currentValue] = { propName, displayName, value: currentValue, data: [] } // <<< later maybe
            hashValues[currentValue] = { [propName]: currentValue, data: [] }

        // since hashValues[currentValue] now exists, push object to data array
        hashValues[currentValue].data.push(curr)
    })

    const arrayValues = Object.values(hashValues)

    // repeat for each data array inside arrayValues
    if (_groupBy.length > 0) arrayValues.forEach((item) => (item.data = groupData(item.data, _groupBy.slice(1))))

    return arrayValues
}

/*

function groupBy(arr, fields) {
  let field = fields[0]               
  if (!field) return arr              
  let retArr = Object.values(
     arr.reduce((obj, current) => {
        if (!obj[current[field]]) obj[current[field]] = {field: field, value: current[field],rows: []}
        obj[current[field]].rows.push(current)
        return obj
     }, {}))
  
  // recurse for each child's rows if there are remaining fields
  if (fields.length){
      retArr.forEach(obj => {
          obj.count = obj.rows.length
          obj.rows = groupBy(obj.rows, fields.slice(1))
      })
  }
  return retArr
}

let result = groupBy(stock, ["order", "item"]);
console.log(result)
 */

/**
 *
 * @param {[Object]} data
 * @param {String} orderBy
 * @param {Boolean} asc
 */
export function arrangeData(data, orderBy, asc) {
    if (!orderBy) return data
    else
        return data.sort((a, b) => {
            if (a[orderBy] > b[orderBy]) {
                return (asc && 1) || -1
            } else if (a[orderBy] < b[orderBy]) {
                return (asc && -1) || 1
            } else {
                return 0
            }
        })
}
