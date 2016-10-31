// @flow
import React, { PropTypes } from 'react';
import { card, md } from 'corkboard';
import Icon from '../Icon';
import icons from '../icons/index';
import { ns } from '../../../.corkboard/cards';

ns('Icon');

card('PropTypes',
md`
\`\`\`jsx
Icon.propTypes = {
  color: PropTypes.oneOf(['white', 'gray', 'dark-gray', 'blue', 'red']),
  icon: PropTypes.oneOf(Object.keys(paths)).isRequired,
  label: PropTypes.string.isRequired,
  size: PropTypes.number,
};
\`\`\`
`
);

card('Colors',
  md`
\`\`\`html
<Icon icon="pin" label="Pin"></Icon>
<Icon icon="pin" label="Pin" color="dark-gray"></Icon>
\`\`\`
`,
  <div>
    <div className="flex">
      <div className="col-2 px2 text-center border-box">
        <h5>gray (default)</h5>
        <Icon icon="pin" label="Pin" />
      </div>
      <div className="col-2 px2 text-center border-box">
        <h5>dark-gray</h5>
        <Icon icon="pin" label="Pin" color="dark-gray" />
      </div>
      <div className="col-2 px2 text-center border-box">
        <h5>white</h5>
        <div
          className="flex flex-column items-center"
          style={{
            backgroundColor: '#555',
            borderRadius: '50%',
            boxSizing: 'border-box',
            height: 26,
            margin: '0 auto',
            paddingTop: '4px',
            width: 26,
          }}
        >
          <Icon icon="pin" label="Pin" color="white" />
        </div>
      </div>
      <div className="col-2 px2 text-center border-box">
        <h5>blue</h5>
        <Icon icon="pin" label="Pin" color="blue" />
      </div>
      <div className="col-2 px2 text-center border-box">
        <h5>red</h5>
        <Icon icon="pin" label="Pin" color="red" />
      </div>
    </div>
  </div>
);


card('Sizes',
  md`
Currently, icons can be any size desired. The default size is 16.
\`\`\`html
<Icon icon="pin" label="Pin" size={16}></Icon>
<Icon icon="pin" label="Pin" size={20}></Icon>
<Icon icon="pin" label="Pin" size={24}></Icon>
<Icon icon="pin" label="Pin" size={28}></Icon>
<Icon icon="pin" label="Pin" size={32}></Icon>
\`\`\`
`,
  <div>
    <div className="flex mxn2 flex-wrap">
      <div className="col-2 px2 text-center border-box">
        <h5>16</h5>
        <Icon icon="pin" label="Pin" size={16} />
      </div>
      <div className="col-2 px2 text-center border-box">
        <h5>20</h5>
        <Icon icon="pin" label="Pin" size={20} />
      </div>
      <div className="col-2 px2 text-center border-box">
        <h5>24</h5>
        <Icon icon="pin" label="Pin" size={24} />
      </div>
      <div className="col-2 px2 text-center border-box">
        <h5>28</h5>
        <Icon icon="pin" label="Pin" size={28} />
      </div>
      <div className="col-2 px2 text-center border-box">
        <h5>32</h5>
        <Icon icon="pin" label="Pin" size={32} />
      </div>
    </div>
  </div>
);

function IconType({ iconName }) {
  return (
    <div className="col-6 sm-col-3 px2 text-center border-box">
      <h5>{iconName}</h5>
      <Icon icon={iconName} label={iconName.replace(/-/g, ' ')} color="gray" />
    </div>
  );
}

IconType.propTypes = {
  iconName: PropTypes.string,
};

card('Types',
  md`
\`\`\`html
<Icon icon="pin" label="Pin"></Icon>
<Icon icon="add-circle" label="Add"></Icon>
<Icon icon="add-pin" label="Add a Pin"</Icon>
<Icon icon="arrow-back" label="Back"</Icon>
<Icon icon="arrow-circle-forward" label="Forward"</Icon>
\`\`\`
`,
  <div>
    <div className="flex mxn2 flex-wrap">
      {Object.keys(icons).map((iconName, idx) =>
        <IconType iconName={iconName} key={idx} />
      )}
    </div>
  </div>);
