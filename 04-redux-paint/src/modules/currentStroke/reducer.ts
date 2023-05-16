import {
  beginStroke,
} from "./actions";
import { RootState } from "../../types";
import { createReducer } from "@reduxjs/toolkit";
import { updateStroke } from "./actions";
import { setStrokeColor } from "./actions";
import { endStroke } from "./actions";

const initialState: RootState["currentStroke"] = {
  points: [],
  color: "#000",
};

export const reducer = createReducer(initialState, builder => {
  builder.addCase(beginStroke, (state, action) => {
    state.points = [action.payload]
  })

  builder.addCase(updateStroke, (state, action) => {
    state.points.push(action.payload)
  })

  builder.addCase(setStrokeColor, (state, action) => {
    state.color = action.payload
  })

  builder.addCase(endStroke, (state, action) => {
    state.points = [];
  })
})

// export const reducer = (
//   state: RootState["currentStroke"] = initialState,
//   action: Action
// ) => {
//   switch (action.type) {
//     case BEGIN_STROKE: {
//       return { ...state, points: [action.payload] };
//     }
//     case UPDATE_STROKE: {
//       return {
//         ...state,
//         points: [...state.points, action.payload],
//       };
//     }
//     case SET_STROKE_COLOR: {
//       return {
//         ...state,
//         color: action.payload,
//       };
//     }
//     case END_STROKE: {
//       return {
//         ...state,
//         points: [],
//       };
//     }
//     default:
//       return state;
//   }
// };
