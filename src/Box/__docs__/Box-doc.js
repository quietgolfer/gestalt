// @flow
import React from 'react';
import { card, md } from 'corkboard';
import Box from '../Box';
import { ns } from '../../../.corkboard/cards';

ns('Box', `
Box is a generic layout component.`);

card('Flexbox', md`
Box uses Flexbox to achieve layout. Most of the flexbox specification is supported with a few helpers for hairier properties.
`);

const Square = ({ width = '2rem', height = '2rem', ...props }: *) => <Box margin={1} color="gray" {...props} dangerouslySetInlineStyle={{ __style: { minWidth: width, minHeight: height } }} />;

const FlexExample = (props: *) => (
  <Box padding={1} xs={{ display: 'flexColumn', column: 4 }} dangerouslySetInlineStyle={{ __style: { height: '8rem' } }}>
    <Box shrink>{JSON.stringify(props)}</Box>
    <Box xs={{ display: 'flex' }} grow padding={1} color="lightGray" {...props}>
      <Square height="1rem" />
      <Square height="2rem" />
      <Square height="3rem" />
    </Box>
  </Box>
);

card('Align Items',
  <Box xs={{ display: 'flex' }} wrap margin={-1}>
    <FlexExample alignItems="start" />
    <FlexExample alignItems="end" />
    <FlexExample alignItems="center" />
    <FlexExample alignItems="baseline" />
    <FlexExample alignItems="stretch" />
  </Box>,
  { heading: false }
);

card('Justify Content',
  <Box xs={{ display: 'flex' }} wrap margin={-1}>
    <FlexExample justifyContent="start" />
    <FlexExample justifyContent="end" />
    <FlexExample justifyContent="center" />
    <FlexExample justifyContent="between" />
    <FlexExample justifyContent="around" />
  </Box>,
  { heading: false }
);

card('Responsive Design',
md`
Box allows you to specify media queries in order to have more control over the responsive behavior of your layout for
\`display\` and \`column\` properties. *Note these properties can **only** be set with a breakpoint attached to them.*

It's good to think about the responsive properties with an "and up" attached to them. If you specify \`xs={}\`,
those styles are applied to \`xs and up\` screens. If you also happen to specify another set of properties at (\`sm\`, \`md\`, or \`lg\`),
those will take over when the screen width has reached their respective breakpoints.

For example, if you have both \`xs\` and \`md\` properties specified, the \`xs\` ones will be applied from screen sizes \`0 - md\`
and the \`md\` ones will be applied to sizes \`md and up\`.

\`\`\`jsx
<Box xs={{ display: 'flex', column: 6 }} md={{ column: 3 }} color="gray" />
<Box xs={{ display: 'flex', column: 6 }} md={{ column: 9 }} color="blue" />
\`\`\`
`,
  <div>
    <Box xs={{ display: 'flex', column: 6 }} md={{ column: 3 }} color="gray" dangerouslySetInlineStyle={{ __style: { height: 25 } }} />
    <Box xs={{ display: 'flex', column: 6 }} md={{ column: 9 }} color="blue" dangerouslySetInlineStyle={{ __style: { height: 25 } }} />
  </div>
);


const PaddingSwatch = (props: *) => (
  <Box {...props} dangerouslySetInlineStyle={{ __style: { backgroundColor: 'rgba(0, 0, 255, 0.2)' } }}>
    <Box color="white" padding={1}>{props.label}</Box>
  </Box>
);

card('Padding', md`
Padding is applied in boints and is always symmetric. You should try to use padding before you use margins as they compose better and don't collapse.

\`\`\`jsx
<Box padding={1} />
<Box padding={{ x: 1 }} />
<Box padding={{ y: 1 }} />
\`\`\`
`,
  <Box xs={{ display: 'flex' }} justifyContent="between" alignItems="center" wrap>
    <PaddingSwatch padding={2} label="2" />
    <PaddingSwatch padding={{ x: 2 }} label="{x: 2}" />
    <PaddingSwatch padding={{ y: 2 }} label="{y: 2}" />
  </Box>
);

const MarginSwatch = (props: { margin: * }) => (
  <Box margin={1} dangerouslySetInlineStyle={{ __style: { backgroundColor: 'rgba(255, 0, 0, 0.2)' } }}>
    <Box padding={1} margin={props.margin} dangerouslySetInlineStyle={{ __style: { backgroundColor: 'rgba(0, 0, 255, 0.2)' } }}>{JSON.stringify(props.margin)}</Box>
  </Box>
);

card('Margins', md`
Margins are applied in boints and are asymmetric. Margins can be -6 to 6 boints. You can set margin to be auto in the left and right axis.

In the example on the right the outer \`Box\` is in transparent red, and the inner \`Box\` is transparent blue.

\`\`\`jsx
<Box margin={1} />
<Box margin={{ top: 1 }} />
<Box margin={{ bottom: 1 }} />
<Box margin={{ left: 1 }} />
<Box margin={{ right: 1 }} />
<Box margin={{ left: 'auto' }} />
<Box margin={{ right: 'auto' }} />
\`\`\`
`,
  <Box>
    <Box xs={{ display: 'flex' }} justifyContent="between" alignItems="center" wrap>
      <MarginSwatch margin={1} />
      <MarginSwatch margin={{ top: 1 }} />
      <MarginSwatch margin={{ bottom: 1 }} />
      <MarginSwatch margin={{ left: 1 }} />
      <MarginSwatch margin={{ right: 1 }} />
    </Box>
    <Box xs={{ display: 'flex' }} justifyContent="between" alignItems="center" wrap>
      <MarginSwatch margin={-1} />
      <MarginSwatch margin={{ top: -1 }} />
      <MarginSwatch margin={{ bottom: -1 }} />
      <MarginSwatch margin={{ left: -1 }} />
      <MarginSwatch margin={{ right: -1 }} />
    </Box>

    <Box>
      <Box margin={1} dangerouslySetInlineStyle={{ __style: { backgroundColor: 'rgba(255, 0, 0, 0.2)' } }}>
        <Box padding={1} margin={{ left: 'auto' }} dangerouslySetInlineStyle={{ __style: { width: 200, backgroundColor: 'rgba(0, 0, 255, 0.2)' } }}>{JSON.stringify({ left: 'auto' })}</Box>
      </Box>

      <Box margin={1} dangerouslySetInlineStyle={{ __style: { backgroundColor: 'rgba(255, 0, 0, 0.2)' } }}>
        <Box padding={1} margin={{ right: 'auto' }} dangerouslySetInlineStyle={{ __style: { width: 200, backgroundColor: 'rgba(0, 0, 255, 0.2)' } }}>{JSON.stringify({ right: 'auto' })}</Box>
      </Box>
    </Box>
  </Box>
);

card('Positioning', md`
Position is static by default. You can also set the position to be fixed.

\`\`\`jsx
<Box position="relative">
  <Box position="absolute" top left />
  <Box position="absolute" top right />
  <Box position="absolute" bottom left />
  <Box position="absolute" bottom right />
</Box>
\`\`\`
`,
  <Box position="relative" color="lightGray" dangerouslySetInlineStyle={{ __style: { height: 200 } }}>
    <Box color="blue" position="absolute" padding={1} top left>top, left</Box>
    <Box color="blue" position="absolute" padding={1} top right>top, right</Box>
    <Box color="blue" position="absolute" padding={1} bottom left>bottom, left</Box>
    <Box color="blue" position="absolute" padding={1} bottom right>bottom, right</Box>
  </Box>
);

const ColorSwatch = ({ color }: { color: * }) => (
  <Box padding={2}>
    <Box
      color={color}
      dangerouslySetInlineStyle={{ __style: { width: 60, height: 60 } }}
      padding={1}
    >
      {color}
    </Box>
  </Box>
);

card('Colors', md`
Boxes are transparent by default.

\`\`\`jsx
<Box color="white" />
<Box color="lightGray" />
<Box color="gray" />
<Box color="darkGray" />
<Box color="red" />
<Box color="blue" />
<Box color="olive" />
<Box color="pine" />
<Box color="orange" />
<Box color="transparent" />
\`\`\`
`,
  <Box xs={{ display: 'flex' }} wrap>
    <ColorSwatch color="white" />
    <ColorSwatch color="lightGray" />
    <ColorSwatch color="gray" />
    <ColorSwatch color="darkGray" />
    <ColorSwatch color="red" />
    <ColorSwatch color="blue" />
    <ColorSwatch color="olive" />
    <ColorSwatch color="pine" />
    <ColorSwatch color="orange" />
    <ColorSwatch color="transparent" />
  </Box>
);

const ShapeSwatch = (
  { shape, width = 60, height = 60 }: { shape: *, width?: number, height?: number }) => (
    <Box padding={2}>
      <Box
        color="gray"
        shape={shape}
        dangerouslySetInlineStyle={{ __style: { width, height } }}
        padding={1}
      >
        {shape}
      </Box>
    </Box>
  );


card('Shapes', md`
\`\`\`jsx
<Box shape="square" />
<Box shape="rounded" />
<Box shape="pill" />
<Box shape="circle" />
<Box shape="roundedTop" />
<Box shape="roundedBottom" />
<Box shape="roundedLeft" />
<Box shape="roundedRight" />
\`\`\`
`,
  <Box xs={{ display: 'flex' }} wrap>
    <ShapeSwatch shape="square" />
    <ShapeSwatch shape="rounded" />
    <ShapeSwatch shape="pill" width={80} />
    <ShapeSwatch shape="circle" />
    <ShapeSwatch shape="roundedTop" />
    <ShapeSwatch shape="roundedBottom" />
    <ShapeSwatch shape="roundedLeft" />
    <ShapeSwatch shape="roundedRight" />
  </Box>
);
