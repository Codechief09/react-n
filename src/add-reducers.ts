import { Reducers, State } from '../default';
import { AdditionalReducers } from '../types/reducer';
import addReducer from './add-reducer';
import GlobalStateManager from './global-state-manager';



type BooleanFunction = () => boolean;



export default function _addReducers<
  G extends {} = State,
  R extends {} = Reducers,
>(
  globalStateManager: GlobalStateManager<G, R>,
  reducers: AdditionalReducers<G, R & any>,
): BooleanFunction {

  // Amalgamate all the functions to remove these reducers.
  const removeReducers: Set<BooleanFunction> = new Set<BooleanFunction>();
  for (const [ name, reducer ] of Object.entries(reducers)) {
    removeReducers.add(
      addReducer<G>(globalStateManager, name, reducer),
    );
  }

  // Return a function that will remove these reducers.
  return (): boolean => {
    let success = true;
    for (const removeReducer of removeReducers) {
      success = success && removeReducer();
    }
    return success;
  };
};
