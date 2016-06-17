import React, { PropTypes } from 'react';
import classnames from 'classnames/bind';
import colors from '../Colors.css';
import { card, doc, ns } from 'devcards';

ns('Colors');

const cx = classnames.bind(colors);

function Swatch({ color, size, shadow }) {
  return (
    <div className="flex flex-column items-center center">
      <div
        className={`circle ${cx(`bg-${color}`)}`}
        style={{
          width: size,
          height: size,
          boxShadow: (shadow ? 'inset 0 0 0 2px rgba(0,0,0,0.1)' : 'none'),
        }}
      />
      <div className="h6 py1 gray">
        <div><code>{'.'}{color}</code></div>
        <div><code>{'.'}{color}{'-hover'}</code></div>
        <div><code>{'.bg-'}{color}</code></div>
        <div><code>{'.bg-'}{color}{'-hover'}</code></div>
      </div>
    </div>
  );
}

Swatch.propTypes = {
  color: PropTypes.string,
  shadow: PropTypes.bool,
  size: PropTypes.nubmer,
};

card('Color',
  doc`# Colors

TODO: This is copied from go/spec but isn't up to date any more. >8 Primary
colors + needs information about making the colors "Pinterest neutral" (i.e. no
"commerce" in "commerce blue").

The BRIO color system relies on a primary neutral palette of grays and white,
with chief contrast provided by Pinterest's corporate identity red plus Commerce
blue; red and blue buttons are used sparingly in order to draw attention. A
limited set of less saturated colors: green and yellow are used consistently
throughout the UI to indicate success and system comments. There are total of
eight colors — carefully chosen to let a few key colors and the user's content
predominate.`,
  <div />,
  {},
  { heading: false });

card('Primary Colors',
  doc`Here are the primary colors :)`,
  <div className="flex mxn1 justify-center flex-wrap">
    <div className="px1 col-3 mb2">
      <Swatch color="white" size="6rem" shadow />
    </div>
    <div className="px1 col-3 mb2">
      <Swatch color="dark-gray" size="6rem" />
    </div>
    <div className="px1 col-3 mb2">
      <Swatch color="light-gray" size="6rem" />
    </div>
    <div className="px1 col-3 mb2">
      <Swatch color="super-light-gray" size="6rem" />
    </div>
    <div className="px1 col-3 mb2">
      <Swatch color="red" size="6rem" />
    </div>
    <div className="px1 col-3 mb2">
      <Swatch color="blue" size="6rem" />
    </div>
    <div className="px1 col-3 mb2">
      <Swatch color="yellow" size="6rem" />
    </div>
    <div className="px1 col-3 mb2">
      <Swatch color="dark-green" size="6rem" />
    </div>
    <div className="px1 col-3 mb2">
      <Swatch color="slate-green" size="6rem" />
    </div>
    <div className="px1 col-3 mb2">
      <Swatch color="pink" size="6rem" />
    </div>
  </div>);

const alts = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple',
].reduce((acc, color) => {
  const g = [];
  for (let i = 0; i < 10; ++i) {
    g.push(`${color}-${i + 1}`);
  }
  acc.push(g);
  return acc;
}, []);

function SmallSwatch({ color, size }) {
  return (
    <div className="mxn1 p1 center">
      <div
        className={`mx-auto circle ${cx(`bg-${color}`)}`}
        style={{
          width: size, height: size,
        }}
      ></div>
      <div className="h6 gray">{color}</div>
    </div>
  );
}

SmallSwatch.propTypes = {
  color: PropTypes.string,
  shadow: PropTypes.bool,
  size: PropTypes.nubmer,
};

card('Extended Palette',
  doc`TODO: Explain when these colors are to be used. Are they part of a
  stable matching between strings and colors? If so, provide example of scale
  mapping String -> Color. In that case, consider dropping color utilities and
  just export raw HEX in JS.`,
  <div className="flex content-stretch">
    {alts.map((g, i) =>
      <div className="flex flex-column col-12 justify-center flex-wrap" key={i}>
        {g.map(color =>
          <div className="" key={color}>
            <SmallSwatch color="" size="2rem" />
          </div>
        )}
      </div>
    )}
  </div>);
