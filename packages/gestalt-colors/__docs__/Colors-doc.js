import React, { PropTypes } from 'react';
import classnames from 'classnames/bind';
import colors from '../Colors.css';
import { card, md } from 'corkboard';
import { ns, stylesTable } from '../../../.corkboard/cards';

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
      <div className="h6 dark-gray py1">
        {color}
      </div>
    </div>
  );
}

Swatch.propTypes = {
  color: PropTypes.string,
  shadow: PropTypes.bool,
  size: PropTypes.string,
};

card('Primary',
  md`The BRIO color system relies on a primary neutral palette of grays and white,
with chief contrast provided by Pinterest's corporate identity red plus Commerce
blue; red and blue buttons are used sparingly in order to draw attention. A
limited set of less saturated colors: green and yellow are used consistently
throughout the UI to indicate success and system comments. There are total of
eight colors — carefully chosen to let a few key colors and the user's content
predominate.`,
  <div className="flex mxn2 flex-wrap">
    <div className="px2 col-3 mb2 border-box">
      <Swatch color="white" size="4rem" shadow />
    </div>
    <div className="px2 col-3 mb2 border-box">
      <Swatch color="dark-gray" size="4rem" />
    </div>
    <div className="px2 col-3 mb2 border-box">
      <Swatch color="gray" size="4rem" />
    </div>
    <div className="px2 col-3 mb2 border-box">
      <Swatch color="light-gray" size="4rem" />
    </div>
    <div className="px2 col-3 mb2 border-box">
      <Swatch color="red" size="4rem" />
    </div>
    <div className="px2 col-3 mb2 border-box">
      <Swatch color="blue" size="4rem" />
    </div>
    <div className="px2 col-3 mb2 border-box">
      <Swatch color="yellow" size="4rem" />
    </div>
    <div className="px2 col-3 mb2 border-box">
      <Swatch color="pine" size="4rem" />
    </div>
    <div className="px2 col-3 mb2 border-box">
      <Swatch color="slate" size="4rem" />
    </div>
  </div>);

stylesTable(require('!!raw!postcss!../Colors.css'));
