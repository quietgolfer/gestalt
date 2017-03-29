// @flow
/* global React$Element */
import React from 'react';
import Box from '../Box/Box';
import Mask from '../Mask/Mask';
import Text from '../Text/Text';
import Icon from '../Icon/Icon';

type Props = {|
  text: string | Array<string>,
  thumbnail?: React$Element<any>,
|};

export default function Toast(props: Props) {
  const { thumbnail, text } = props;

  let contents;
  // Confirmation Toasts
  if (text instanceof Array && text.length > 1) {
    contents = (
      <Box xs={{ display: 'flex' }}>
        <Box xs={{ display: 'flexColumn' }} justifyContent="center">
          {thumbnail ?
            <Mask shape="rounded" height={48} width={48}>
              {thumbnail}
            </Mask>
          : null }
        </Box>
        <Box
          xs={{ display: 'flexColumn' }}
          justifyContent="center"
          dangerouslySetInlineStyle={{ __style: { paddingLeft: 10 } }}
        >
          <Box dangerouslySetInlineStyle={{ __style: { fontWeight: 'normal' } }}>
            <Text color="white" size="lg">{text[0]}</Text>
          </Box>
          <Text bold color="white" size="lg">{text[1]}</Text>
        </Box>
      </Box>
    );
  } else { // Toasts as Guides
    contents = (
      <Box xs={{ display: 'flex' }} justifyContent="between" alignItems="center">
        <Text bold color="white" size="lg">{text}</Text>
        <Box dangerouslySetInlineStyle={{ __style: { paddingLeft: 24 } }}>
          <Icon accessibilityLabel="" color="white" icon="arrow-circle-forward" size={36} />
        </Box>
      </Box>
    );
  }

  return (
    <Box
      color="darkGray"
      fit
      shape="pill"
      dangerouslySetInlineStyle={{
        __style: {
          width: 366,
          padding: '16px 28px',
          marginBottom: 10,
        }
      }}
    >
      {contents}
    </Box>
  );
}
