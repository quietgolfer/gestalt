// @flow
/* global React$Element */
import React from 'react';
import Box from '../Box/Box';
import Controller from '../FlyoutUtils/Controller';
import Text from '../Text/Text';

type Props = {
  id?: string,
  idealDirection?: 'up' | 'right' | 'down' | 'left',
  isOpen: boolean,
  message: string,
  onDismiss: () => void,
  size?: 'xs' | 'sm' | 'md', /* default sm */
  trigger: React$Element<any>,
};

export default function ErrorFlyout(props: Props) {
  const { id, idealDirection, isOpen, message, onDismiss, size, trigger } = props;

  return (
    <Controller
      bgColor="yellow"
      idealDirection={idealDirection}
      isOpen={isOpen}
      onDismiss={onDismiss}
      size={size}
      trigger={trigger}
    >
      <Box padding={2}>
        <Text bold color="white" size="md">
          <span id={id}>{message}</span>
        </Text>
      </Box>
    </Controller>
  );
}
