// @flow
import React from 'react';
import classnames from 'classnames/bind';
import borders from '../Borders.css';
import { card, doc, ns } from 'devcards';

ns('Borders');

const cx = classnames.bind(borders);

type Props = {border: string, hasFill?: boolean}

function Swatch({ border, hasFill }: Props) {
  return (
    <div className="flex flex-column items-center center">
      <div
        className={`${cx(`${border}`)}`}
        style={{
          width: '6rem',
          height: '6rem',
          backgroundColor: (hasFill ? '#efefef' : 'transparent'),
        }}
      />
      <div className="h6 py1 gray">
        <div><code>{'.'}{border}</code></div>
      </div>
    </div>
  );
}

const borderLines = [
  'border',
  'border-top',
  'border-bottom',
  'border-left',
  'border-right',
];

card('Border Lines',
  doc`Use the following classes for applying border outlines to elements:

\`\`\`html
<div class="border"> .border </div>
<div class="border-top"> .border-top </div>
<div class="border-bottom"> .border-bottom </div>
<div class="border-right"> .border-right </div>
<div class="border-left"> .border-left </div>
\`\`\`
 `,
  <div className="flex mxn1 justify-center flex-wrap">
    {borderLines.map((border, i) =>
      <div className="mx1 col-3 mb2" key={i}>
        <Swatch border={border} />
      </div>
    )}
  </div>);

const borderRadii = [
  'circle',
  'rounded',
  'rounded-top',
  'rounded-bottom',
  'rounded-right',
  'rounded-left',
];

card('Border Radii',
  doc`Use the following classes for applying border radii to elements:


\`\`\`html
<div class="circle"> .circle </div>
<div class="rounded"> .rounded </div>
<div class="rounded-top"> .rounded-top </div>
<div class="rounded-bottom"> .rounded-bottom </div>
<div class="rounded-right"> .rounded-right </div>
<div class="rounded-left"> .rounded-left </div>

\`\`\`
  `,
  <div className="flex mxn1 justify-center flex-wrap">
    {borderRadii.map((border, i) =>
      <div className="mx1 col-3 mb2" key={i}>
        <Swatch border={border} hasFill />
      </div>
    )}
  </div>);
