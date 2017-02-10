// @flow
/* global React$Element */
import React from 'react';
import Box from '../Box/Box';
import Controller from '../FlyoutUtils/Controller';

type Props = {
  children?: any,
  idealDirection?: 'up' | 'right' | 'down' | 'left',
  isOpen: boolean,
  onDismiss: () => void,
  size?: 'xs' | 'sm' | 'md',
  trigger: React$Element<any>,
};

export default function Tooltip(props: Props) {
  const { children, idealDirection, isOpen, onDismiss, size, trigger } = props;

  return (
    <Box xs={{ display: 'inlineBlock' }}>
      <Controller
        bgColor="dark-gray"
        idealDirection={idealDirection}
        isOpen={isOpen}
        onDismiss={onDismiss}
        size={size}
        trigger={trigger}
      >
        <Box padding={2}>
          {children}
        </Box>
      </Controller>
    </Box>
  );
}
