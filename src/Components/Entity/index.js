import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Lodash
import get from 'lodash/get';
// Actions
import EntityActions from '../../Redux/ActionsAndReducers/Entity';
// Utils
import MutateResponse from './Utils';

/**
 * Random Component
 * @augments {Component<Props, State>}
 */

class Entity extends React.Component {
  componentDidMount() {
    const { register, entityRef } = this.props;

    // @workarround to give entity time to [ Register and reset ]
    // in case i reset and registered the same entity  [twice ]
    // in 2 different screens
    setTimeout(() => {
      // if there is no entity in the store with that name
      if (this.storeId && !this.store) {
        register(this.storeId);
      }
    });

    entityRef(this);

    // Sync the model
    // if (this.store) {
    //     // timeout workaround for BaseFormComponent setState
    //     setTimeout(() => this.props.onEntityUpdated((this.store && this.store.data) ? this.store.data : {}));
    // }
  }

  componentDidUpdate(prevProps) {
    if (this.props.storeId && this.props.storeId !== prevProps.storeId) {
      this.componentDidMount();
      return;
    }

    if (this.store) {
      const {
        received,
        posted,
        error,
        responseFromGet,
        responseFromPost,
      } = this.store;
      
      if (received && !error) {
        this.props.onEntityReceived(MutateResponse(responseFromGet) || {});
        this.props.resetProp(this.storeId, 'received');
      }

      if (posted && !error) {
        this.props.onEntityPosted(MutateResponse(responseFromPost) || {});
        this.props.resetProp(this.storeId, 'posted');
      }

      if (received && error) {
        this.props.onEntityReceivedError(error || {});
        this.props.resetProp(this.storeId, 'received');
      }

      if (posted && error) {
        this.props.onEntityPostedError(error || {});
        this.props.resetProp(this.storeId, 'posted');
      }
    }
  }

  get(data) {
    this.props.get(this.storeId, {
      ...this.props.data, // For auto get Feature
      ...data,
    });
  }

  post(data) {
    this.props.post(this.storeId, data);
  }

  reset() {
    this.props.reset(this.storeId);
  }

  resetProp(prop) {
    this.props.resetProp(this.storeId, prop);
  }

  resetResponseProps() {
    this.props.resetResponseProps(this.storeId);
  }

  get storeId() {
    const { storeId } = this.props;

    return storeId;
  }

  get store() {
    const { entityStore } = this.props;

    return get(entityStore, `byId.${this.storeId}`, null);
  }

  componentWillUnmount() {
    if (this.storeId && this.store) {
      this.reset();
    }
  }

  render() {
    const { storeId, render } = this.props;
    // Render in case there is storeId and there is store
    if (storeId && this.store) {
      return render(this.store) || null;
    }

    return null;
  }
}

Entity.propTypes = {
  storeId: PropTypes.string,

  data: PropTypes.object,
  entityStore: PropTypes.object,

  get: PropTypes.func,
  post: PropTypes.func,
  reset: PropTypes.func,
  render: PropTypes.func,

  register: PropTypes.func,
  resetProp: PropTypes.func,
  entityRef: PropTypes.func,
  onEntityReceived: PropTypes.func,
  onEntityPosted: PropTypes.func,

  resetResponseProps: PropTypes.func,
  onEntityReceivedError: PropTypes.func,
  onEntityPostedError: PropTypes.func,
};

Entity.defaultProps = {
  storeId: '',

  data: {},
  entityStore: {},

  get() { },
  post() { },
  reset() { },
  render() { },
  register() { },
  resetProp() { },
  entityRef() { },
  onEntityPosted() { },
  onEntityReceived() { },
  onEntityReceivedError() { },
  onEntityPostedError() { },
  resetResponseProps() { },
};

const mapStateToProps = store => ({
  entityStore: store.entity,
});

const mapDispatchToProps = dispatch => ({
  register: id => dispatch(EntityActions.register(id)),

  get: (id, data) => dispatch(EntityActions.get(id, data)),
  post: (id, data) => dispatch(EntityActions.post(id, data)),

  reset: id => dispatch(EntityActions.reset(id)),
  resetProp: (id, prop) => dispatch(EntityActions.resetProp(id, prop)),
  resetResponseProps: id => dispatch(EntityActions.resetResponseProps(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Entity);
