import React, { PropTypes } from 'react';
import Icon from '../Icon';
import icons from '../icons/index';
import { card, md } from 'corkboard';
import { ns } from '../../../.corkboard/cards';

ns(
  'Icon',
  `
By default an icon is rendered in medium size and a gray color
`);

card('Colors',
  md`
  \`\`\`html
  <Icon type="pin" label="Pin"></Icon>
  <Icon type="pin" label="Pin" color="dark-gray"></Icon>
  \`\`\`
  `,
  <div>
    <div className="flex">
      <div className="col-2 px2 text-center border-box">
        <h5>gray</h5>
        <Icon icon="pin" label="Pin" size={21} />
      </div>
      <div className="col-2 px2 text-center border-box">
        <h5>dark-gray</h5>
        <Icon icon="pin" label="Pin" size={21} color="dark-gray" />
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
            paddingTop: '4px',
            textAlign: 'center',
            width: 26,
          }}
        >
          <Icon icon="pin" label="Pin" size={21} color="white" />
        </div>
      </div>
      <div className="col-2 px2 text-center border-box">
        <h5>blue</h5>
        <Icon icon="pin" label="Pin" size={21} color="blue" />
      </div>
    </div>
  </div>);


card('Sizes',
  md`
  \`\`\`html
  <Icon type="pin" label="Pin" size={16}></Icon>
  <Icon type="pin" label="Pin" size={20}></Icon>
  <Icon type="pin" label="Pin" size={24}></Icon>
  <Icon type="pin" label="Pin" size={28}></Icon>
  <Icon type="pin" label="Pin" size={32}></Icon>
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
  </div>);

function IconType({ iconName }) {
  return (
    <div className="col-6 sm-col-3 px2 text-center border-box">
      <h5>{iconName}</h5>
      <Icon icon={iconName} label={iconName.replace(/-/g, ' ')} size={21} color="gray" />
    </div>
  );
}

IconType.propTypes = {
  iconName: PropTypes.string,
};

card('Types',
  md`
  \`\`\`html
  <Icon type="add" label="Pin"></Icon>
  <Icon type="add-circle" label="Add"></Icon>
  <Icon type="add-pin" label="Add a Pin"</Icon>
  <Icon type="arrow-back" label="Back"</Icon>
  <Icon type="arrow-circle-forward" label="Forward"</Icon>
  \`\`\`
  `,
  <div>
    <div className="flex mxn2 flex-wrap">
      {Object.keys(icons).map((iconName, idx) =>
        <IconType iconName={iconName} key={idx} />
      )}
    </div>
  </div>);
