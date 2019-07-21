import { Route, Switch } from 'react-router-dom';
import React from 'reactn';
import About from '../routes/about';
import AddCallback from '../routes/add-callback';
import AddReducer from '../routes/add-reducer';
import CreateProvider from '../routes/create-provider';
import GetGlobal from '../routes/get-global';
import Install from '../routes/install';
import RemoveCallback from '../routes/remove-callback';
import ResetGlobal from '../routes/reset-global';
import SetGlobal from '../routes/set-global';
import Support from '../routes/support';
import UseDispatch from '../routes/use-dispatch';
import UseGlobal from '../routes/use-global';
import WithGlobal from '../routes/with-global';
import WithInit from '../routes/with-init';
import './app.scss';
import Header from './header';
import Navigation from './navigation';



export default function App(): JSX.Element {
  return (
    <div className="app">
      <Header />
      <div>
        <main>
          <Switch>
            {/* Getting Started */}
            <Route
              component={Install}
              path="/install"
            />

            {/* API */}
            <Route
              component={AddCallback}
              path="/addCallback"
            />
            <Route
              component={AddReducer}
              path="/addReducer"
            />
            <Route
              component={CreateProvider}
              path="/createProvider"
            />
            <Route
              component={GetGlobal}
              path="/getGlobal"
            />
            <Route
              component={RemoveCallback}
              path="/removeCallback"
            />
            <Route
              component={ResetGlobal}
              path="/resetGlobal"
            />
            <Route
              component={SetGlobal}
              path="/setGlobal"
            />
            <Route
              component={UseDispatch}
              path="/useDispatch"
            />
            <Route
              component={UseGlobal}
              path="/useGlobal"
            />
            <Route
              component={WithGlobal}
              path="/withGlobal"
            />
            <Route
              component={WithInit}
              path="/withInit"
            />

            {/* Support */}
            <Route
              component={Support}
              path="/support"
            />

            {/* Default */}
            <Route component={About} />
          </Switch>
        </main>
        <Navigation />
      </div>
    </div>
  );
}
