import { Reducers, State } from '../../default';
import { NewGlobalState } from '../global-state-manager';

// Additional Reducers cannot maintain their argument types, as they don't
//   exist until runtime.
export interface AdditionalDispatchers<G extends {} = State> {
  [name: string]: Dispatcher<G, any>;
}

export interface AdditionalReducers<
  G extends {} = State,
  R extends {} = Reducers,
> {
  [name: string]: Reducer<G, R, any[], NewGlobalState<G>>;
}

export interface Dispatcher<
  G extends {} = State,
  A extends any[] = any[],
> extends CallableFunction {
  (...args: A): Promise<G>;
}

export type DispatcherMap<G extends {} = State, R extends {} = Reducers> = {
  [name in keyof R]: Dispatcher<G, ExtractArguments<R[name]>>;
};

export type Dispatchers<
  G extends {} = State,
  R extends {} = Reducers,
> = DispatcherMap<G, R> & AdditionalDispatchers<G>;

export type ExtractArguments<R> =
  R extends Reducer<infer _G, infer _R, infer A>
    ? A
    : never;

export default interface Reducer<
  G extends {} = State,
  R extends {} = Reducers,
  A extends any[] = any[],
  N extends NewGlobalState<G> = NewGlobalState<G>,
> extends CallableFunction {
  (global: G, dispatch: Dispatchers<G, R>, ...args: A): N;
}
