import { createReducer } from "@reduxjs/toolkit";
import { RootState } from "../../types";
import { endStroke } from "./actions";

const initialStrokes: RootState["strokes"] = []

export const reducer = createReducer(initialStrokes, (builder) => {
  builder.addCase(endStroke, (state, action) => {
    const {historyIndex, stroke} = action.payload

    if(historyIndex === 0) {
      state.push(stroke)
    }else {
      state.splice(-historyIndex, historyIndex, stroke)
    }
  })
})

// export const reducer = (state: RootState["strokes"] = [], action: Action) => {
//   switch (action.type) {
//     case END_STROKE: {
//       const { historyLimit, stroke } = action.payload;
//       if (!stroke.points.length) {
//         return state;
//       }
//       return [...state.slice(0, state.length - historyLimit), stroke];
//     }
//     default:
//       return state;
//   }
// };
