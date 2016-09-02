import React, { PropTypes } from 'react';
import classnames from 'classnames/bind';
import colors from '../Colors.css';
import { card, md, ns } from 'corkboard';

ns('Colors');

card('Colors',
  md`# Colors`, <div />, {}, { heading: false });

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
  size: PropTypes.string,
};

card('Color system',
  md`The BRIO color system relies on a primary neutral palette of grays and white,
with chief contrast provided by Pinterest's corporate identity red plus Commerce
blue; red and blue buttons are used sparingly in order to draw attention. A
limited set of less saturated colors: green and yellow are used consistently
throughout the UI to indicate success and system comments. There are total of
eight colors — carefully chosen to let a few key colors and the user's content
predominate.`,
  <div className="flex mxn1 justify-center flex-wrap">
    <div className="px1 col-3 mb2">
      <Swatch color="white" size="6rem" shadow />
    </div>
    <div className="px1 col-3 mb2">
      <Swatch color="dark-gray" size="6rem" />
    </div>
    <div className="px1 col-3 mb2">
      <Swatch color="gray" size="6rem" />
    </div>
    <div className="px1 col-3 mb2">
      <Swatch color="light-gray" size="6rem" />
    </div>
    <div className="px1 col-3 mb2">
      <Swatch color="red" size="6rem" />
    </div>
    <div className="px1 col-3 mb2">
      <Swatch color="blue" size="6rem" />
    </div>
    <div className="px1 col-3 mb2">
      <Swatch color="mustard" size="6rem" />
    </div>
    <div className="px1 col-3 mb2">
      <Swatch color="pine" size="6rem" />
    </div>
    <div className="px1 col-3 mb2">
      <Swatch color="slate" size="6rem" />
    </div>
    <div className="px1 col-3 mb2">
      <Swatch color="salmon" size="6rem" />
    </div>
  </div>);
