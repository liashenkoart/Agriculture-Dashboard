/**
 * initial state
 *
 * groupBy: [],
 * orderBy: "",
 * asc: true,
 * inputValue: "",
 * rows: 10,
 * currentPage: 1,
 */

function TableReducer(state = {}, action) {
    //
    const { type, payload } = action
    //
    switch (type) {
        //
        case "INPUT_CHANGE": {
            const { inputValue } = payload
            return { ...state, inputValue, currentPage: 1 }
        }
        //
        case "ADD_GROUP_BY": {
            const { propName, displayName } = payload
            return { ...state, groupBy: [...state.groupBy, { propName, displayName }] }
        }
        //
        case "REMOVE_GROUP_BY": {
            const { propName, displayName } = payload
            return {
                ...state,
                groupBy: [
                    ...state.groupBy.filter(
                        (_propData) => _propData.propName !== propName && _propData.displayName !== displayName
                    ),
                ],
            }
        }
        //
        case "SET_ORDER_BY": {
            const { orderBy } = payload

            if (state.orderBy !== orderBy) {
                return { ...state, orderBy: orderBy, asc: true }
            } else if (state.orderBy === orderBy && state.asc) {
                return { ...state, orderBy: orderBy, asc: false }
            } else if (state.orderBy === orderBy && !state.asc) {
                return { ...state, orderBy: "", asc: true }
            }

            break
        }
        //
        case "ROW_NUMBER_CHANGE": {
            const { rows } = payload
            return { ...state, rows }
        }
        //
        case "CURRENT_PAGE_CHANGE": {
            const { page } = payload
            return { ...state, currentPage: page }
        }
        default: {
            return state
        }
    }
}

export default TableReducer
