import React, { PropTypes } from 'react';
import Icon from '../Icon';
import icons from '../icons/index';
import { card, text, md, ns } from 'corkboard';
import { dangerous } from '../../../.corkboard/dangerous';

ns('Icon');
dangerous('Icon');

text(`
# Icon
By default an icon is rendered in medium size and a gray color
`);

card('Icon colors',
  md`## Colors`,
  <div>
    <div className="flex mxn2">
      <div className="col-2 px2 text-center border-box">
        <h5>gray</h5>
        <Icon icon="pin" label="Pin" size={21} color="gray" />
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
  </div>,
  {},
  { heading: false });


card('Icon sizes',
  md`## Sizes`,
  <div>
    <div className="flex mxn2 flex-wrap">
      <div className="col-2 px2 text-center border-box">
        <h5>12</h5>
        <Icon icon="pin" label="Pin" size={12} />
      </div>
      <div className="col-2 px2 text-center border-box">
        <h5>14</h5>
        <Icon icon="pin" label="Pin" size={14} />
      </div>
      <div className="col-2 px2 text-center border-box">
        <h5>16</h5>
        <Icon icon="pin" label="Pin" size={16} />
      </div>
      <div className="col-2 px2 text-center border-box">
        <h5>18</h5>
        <Icon icon="pin" label="Pin" size={18} />
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
      <div className="col-2 px2 text-center border-box">
        <h5>36</h5>
        <Icon icon="pin" label="Pin" size={36} />
      </div>
      <div className="col-2 px2 text-center border-box">
        <h5>40</h5>
        <Icon icon="pin" label="Pin" size={40} />
      </div>
    </div>
  </div>,
  {},
  { heading: false });

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

card('Icon types',
  md`## Types`,
  <div>
    <div className="flex mxn2 flex-wrap">
      {Object.keys(icons).map((iconName, idx) =>
        <IconType iconName={iconName} key={idx} />
      )}
    </div>
  </div>,
  {},
  { heading: false });
