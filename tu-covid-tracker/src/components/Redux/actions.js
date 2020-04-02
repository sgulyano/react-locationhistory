/**
 * Action Types
 *
 * all action
 */

// Action Types
import actionTypes from './actionTypes'

const updateHeatmap = heatdata => (dispatch, getState) => {
  // Dispatch the result.
  dispatch({
    type: actionTypes.UPDATE_HEATMAP,
    payload: {
      heatdata: heatdata,
    },
  })
}


// Export the actions.
export { updateHeatmap }
