// @flow
import React from 'react';
import typography from '../Typography.css';
import { card, md, ns } from 'corkboard';

ns('Typography');

card('Typography',
  md`# Typography`,
  <div />, {}, { heading: false });

const textAlignment = [
  'text-left',
  'text-right',
  'text-center',
  'text-justify',
];

card('Text alignment',
  md`
  You can apply the following classes to adjust the positioning of text within wrapper elements.

  \`\`\`html
  <div class='text-left'> .text-left </div>
  <div class='text-right'> .text-right </div>
  <div class='text-center'> .text-center </div>
  <div class='text-justify'> .text-justify </div>
  \`\`\`
  `,
  <div className="container">
    {textAlignment.map((name, idx) =>
      <div className={typography[name]} key={idx}> {`.${name}`} </div>
    )}
  </div>);

const textStyles = [
  'bold',
  'regular',
  'italic',
  'underline',
  'sans-serif',
  'antialiased',
];

card('Text styling',
  md`
  You can use the following classes to apply styling to the text within wrapper elements.

  \`\`\`html
  <div class='bold'> .bold </div>
  <div class='regular'> .regular </div>
  <div class='italic'> .italic </div>
  <div class='underline'> .underline </div>
  <div class='sans-serif'> .sans-serif </div>
  <div class='antialiased'> .antialised </div>
  \`\`\`
  `,
  <div className="container">
    {textStyles.map((style, idx) =>
      <div className={typography[style]} key={idx}> {`.${style}`} </div>
    )}
  </div>);

card('Font size',
  md`If you want different text sizes, you can use the following classes:
  \` {text, display}{xs, s, m, l, xl} \`. These are the responsive font-sizes that
  are up to spec.

  `,
  <div className="container">
    {['text', 'display'].map((style, i) =>
      ['xs', 's', 'm', 'l', 'xl'].map((size, j) =>
        <div className="bold">
          <span className={typography[`${style}-${size}`]} key={i + j}>
            {`.${style}-${size}`}
          </span>
          <span className={`${typography[`${style}-${size}`]} ${typography['locale-ja']}`}>
            こんにちは
          </span>
        </div>
      )
    )}
  </div>);


card('Text overflow',
  md`
  Gestalt provides utility classes to deal with text overflow. \`.no-wrap\`, \`.break-word\`, or
  \`.truncate\` (which provides an ellipsis).
  `,
  <div className="container">
    <div className={typography['no-wrap']}>
      <h3> <code> .no-wrap </code> </h3>
      Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum

    </div>
    <div className={typography['break-word']}>
      <h3> <code> .break-word </code> </h3>
      Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum
      Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum
    </div>
    <div className={typography.truncate}>
      <h3> <code> .truncate </code> </h3>
      Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum
      Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum
    </div>
  </div>);