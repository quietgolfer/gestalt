// @flow
/* global React$Element */
import React from 'react';
import Controller from '../FlyoutUtils/Controller';

type Props = {
  children?: any,
  closeLabel: string,
  idealDirection?: 'up' | 'right' | 'down' | 'left',
  isOpen: boolean,
  onDismiss: () => void,
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  trigger: React$Element<any>,
};

export default function Flyout(props: Props) {
  const { children, closeLabel, idealDirection, isOpen, onDismiss, size, trigger } = props;

  return (
    <Controller
      closeLabel={closeLabel}
      idealDirection={idealDirection}
      isOpen={isOpen}
      onDismiss={onDismiss}
      size={size}
      trigger={trigger}
    >
      {children}
    </Controller>
  );
}
