import React from 'react';
import PropTypes from 'prop-types';

import { setIcon } from '../../Services/Utils';

function ActivityIndicator({ descriptiveText }) {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <img
        src={setIcon('Icons/circular-indicator', 'gif')}
        alt="Activity Indicator"
        className="activity-indicator-image"
      />

      <p className="mb-0 mr-2 activity-indicator-text">{descriptiveText || 'Loading...'}</p>
    </div>
  );
}

ActivityIndicator.propTypes = {
  descriptiveText: PropTypes.string,
};

ActivityIndicator.defaultProps = {
  descriptiveText: '',
};

export default ActivityIndicator;
