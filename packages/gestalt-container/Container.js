import React, { PropTypes } from 'react';

export default function Container({ children }) {
  return (
    <div style={{ maxWidth: '40rem', marginLeft: 'auto', marginRight: 'auto' }}>
      {children}
    </div>
  );
}

Container.propTypes = {
  children: PropTypes.node,
};
