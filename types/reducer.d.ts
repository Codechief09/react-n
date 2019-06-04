import { Reducers, State } from '../default';
import Dispatchers from './dispatchers';
import NewGlobalState from './new-global-state';

export interface AdditionalReducers<
  G extends {} = State,
  R extends {} = Reducers,
> {
  [name: string]: Reducer<G, R, any[], NewGlobalState<G>>;
}

export interface PropertyReducer<
  G extends {} = State,
  A extends any[] = any[],
  P extends keyof G = keyof G,
> extends CallableFunction {
  (value: G[P], ...args: A): G[P];
}


export default interface Reducer<
  G extends {} = State,
  R extends {} = Reducers,
  A extends any[] = any[],
  N extends NewGlobalState<G> = NewGlobalState<G>,
> extends CallableFunction {
  (global: G, dispatch: Dispatchers<G, R>, ...args: A): N;
}
