// @flow
import React, { PropTypes } from 'react';
import Icon from '../../packages/gestalt-icon/Icon';
import icons from '../../packages/gestalt-icon/icons/index';


function IconType({ iconName }) {
  return (
    <div>
      <h5>{iconName}</h5>
      <Icon icon={iconName} label={iconName.replace(/-/g, ' ')} size={21} color="gray" />
    </div>
  );
}

IconType.propTypes = {
  iconName: PropTypes.string,
};

export default function IconA11Y() {
  return (
    <div>
      {Object.keys(icons).map((iconName, idx) =>
        <IconType iconName={iconName} key={idx} />
      )}
    </div>
  );
}
