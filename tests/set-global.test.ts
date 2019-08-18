import GlobalStateManager from '../src/global-state-manager';
import setGlobal from '../src/set-global';
import DispatchFunction from '../types/dispatch-function';
import Dispatchers from '../types/dispatchers';
import { G, INITIAL_REDUCERS, INITIAL_STATE, R } from './utils/initial';
import spyOn from './utils/spy-on-global-state-manager';



const CALLBACK: jest.Mock<void, [G, DispatchFunction<G> & Dispatchers<G, R>]> = jest.fn();

const STATE_CHANGE: Partial<G> = {
  x: true,
};

const NEW_STATE: G = {
  ...INITIAL_STATE,
  ...STATE_CHANGE,
};



describe('setGlobal', (): void => {

  let globalStateManager: GlobalStateManager<G, R>;
  beforeEach((): void => {
    globalStateManager =
      new GlobalStateManager(INITIAL_STATE, INITIAL_REDUCERS);
  });



  it('should be a function with 3 arguments', (): void => {
    expect(setGlobal).toBeInstanceOf(Function);
    expect(setGlobal).toHaveLength(3);
  });

  it(
    'should return a Promise of the new state if there is no callback',
    async (): Promise<void> => {
      const p = setGlobal<G>(globalStateManager, STATE_CHANGE);
      expect(p).toBeInstanceOf(Promise);
      const newGlobalState: G = await p;
      expect(newGlobalState).toStrictEqual(globalStateManager.state);
    }
  );

  it(
    'should return a Promise of the new state if there is a callback',
    async (): Promise<void> => {
      const p = setGlobal<G>(globalStateManager, STATE_CHANGE, CALLBACK);
      expect(p).toBeInstanceOf(Promise);
      const newGlobalState: G = await p;
      expect(newGlobalState).toStrictEqual(globalStateManager.state);
    }
  );

  it(
    'should call the callback with the new global state',
    async (): Promise<void> => {
      await setGlobal<G>(globalStateManager, STATE_CHANGE, CALLBACK);
      expect(CALLBACK).toHaveBeenCalledTimes(1);
      expect(CALLBACK).toHaveBeenCalledWith(
        NEW_STATE,
        expect.anything(),
        STATE_CHANGE,
      );
      expect(CALLBACK.mock.calls[0][1].toString()).toBe(globalStateManager.dispatcherMap.toString());
    }
  );



  describe('GlobalStateManager.set', (): void => {

    const spies = spyOn('set');

    it('should be called if there is no callback', async (): Promise<void> => {
      await setGlobal<G>(globalStateManager, STATE_CHANGE);
      expect(spies.set).toHaveBeenCalledTimes(1);
      expect(spies.set).toHaveBeenCalledWith(STATE_CHANGE);
    });

    it('should be called if there is a callback', async (): Promise<void> => {
      await setGlobal<G>(globalStateManager, STATE_CHANGE, CALLBACK);
      expect(spies.set).toHaveBeenCalledTimes(2);
      expect(spies.set).toHaveBeenNthCalledWith(1, STATE_CHANGE);
      expect(spies.set).toHaveBeenNthCalledWith(2, undefined);
    });
  });

});
