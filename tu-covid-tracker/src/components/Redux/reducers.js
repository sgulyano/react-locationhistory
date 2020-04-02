/**
 * Graph Reducer
 *
 * Creates a Redux reducer for populating the graph.
 */

// Action Types
import actionTypes from './actionTypes'

// Setup initial state with an fleet info object.
const initialState = {
  heatdata: null 
}

// Export the Device Reducer.
export default (state = initialState, action) => {
  console.log('help')
  switch (action.type) {
    case actionTypes.UPDATE_HEATMAP: {
      const { heatdata } = action.payload
      return { ...state, heatdata: heatdata }
    }
    default:
      return state
  }
}
