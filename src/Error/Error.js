// @flow
/* global React$Element */
import React from 'react';
import Box from '../Box/Box';
import Controller from '../FlyoutUtils/Controller';
import Text from '../Text/Text';

type Props = {
  idealDirection?: 'up' | 'right' | 'down' | 'left',
  isOpen: boolean,
  onDismiss: () => void,
  size?: 'xs' | 'sm' | 'md', /* default sm */
  text: string,
  trigger: React$Element<any>,
};

export default function Error(props: Props) {
  const { idealDirection, isOpen, onDismiss, size, text, trigger } = props;

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
        <Text bold color="white" size="md">{text}</Text>
      </Box>
    </Controller>
  );
}
