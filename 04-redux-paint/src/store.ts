import {
  configureStore,
  getDefaultMiddleware,
  combineReducers,
} from "@reduxjs/toolkit";
import strokes from "./modules/strokes/slice";
import logger from "redux-logger";
import { currentStroke } from "./modules/currentStroke/slice";
import historyIndex from "./modules/historyIndex/slice";
const middleware = [...getDefaultMiddleware(), logger];
export const store = configureStore({
  reducer: combineReducers({
    historyIndex,
    currentStroke,
    strokes,
  }),
  middleware,
});
