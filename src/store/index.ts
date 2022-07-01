import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { AuthReducer } from './auth';
import { ChartsReducer } from './chart';

const rootReducer = combineReducers({
    auth: AuthReducer,
    charts: ChartsReducer,
});
  
const store = createStore(rootReducer, composeWithDevTools());

type RootState = ReturnType<typeof store.getState>;

export { store };
export type { RootState };