import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import RoutesConfiguration from 'protected-react-routes-generator';

// History
import { history } from '../Redux/createStore';

// Components
import Layout from '../Components/AppLayout';
// Screens
import PageNotFound from '../Screens/PageNotFound';

// Routes
import { 
  anonymousStructure,
  authorizedStructure,
} from './Routes';

function AppNavigation({ auth }) {
  const isAuthenticated = useMemo(() => {
    const { isAuthenticated } = auth || {};

    return isAuthenticated;
  }, [auth]);

  return (
    <ConnectedRouter history={history}>
      <Layout fullWidth>
        <Switch>
          {RoutesConfiguration({
            isAuthenticated,
            anonymousStructure,
            authorizedStructure,
            fallbackComponent: <PageNotFound />
          })}
        </Switch>
      </Layout>
    </ConnectedRouter>
  );
}

AppNavigation.propTypes = {
  auth: PropTypes.object,
  location: PropTypes.object,

  startup: PropTypes.func,
};

AppNavigation.defaultProps = {
  auth: {},
  location: {},

  startup() { }
};

const mapStateToProps = store => ({
  auth: store.auth,
});

export default connect(mapStateToProps)(AppNavigation);
