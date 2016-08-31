import React, { PropTypes } from 'react';
import Icon from '../Icon';
import icons from '../icons/index';
import { card, doc, ns } from 'corkboard';

ns('Icon');

card('Icon',
  doc`# Icon

By default an icon is rendered in medium size and a light-gray color`,
  null, {}, { heading: false });

card('Icon colors',
  doc`## Colors`,
  <div>
    <div className="flex mxn2">
      <div className="col-2 px2 text-center border-box">
        <h5>light-gray</h5>
        <Icon icon="pin" label="Pin" size={21} color="light-gray" />
      </div>
      <div className="col-2 px2 text-center border-box">
        <h5>dark-gray</h5>
        <Icon icon="pin" label="Pin" size={21} color="dark-gray" />
      </div>
      <div className="col-2 px2 text-center border-box">
        <h5>white</h5>
        <div
          className="flex flex-column items-center circle mr-auto ml-auto"
          style={{
            backgroundColor: '#555',
            boxSizing: 'border-box',
            height: 26,
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '-4px',
            paddingTop: '4px',
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
  doc`## Sizes`,
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
      <Icon icon={iconName} label={iconName.replace(/-/g, ' ')} size={21} color="light-gray" />
    </div>
  );
}

IconType.propTypes = {
  iconName: PropTypes.string,
};

card('Icon types',
  doc`## Types`,
  <div>
    <div className="flex mxn2 flex-wrap">
      {Object.keys(icons).map((iconName, idx) =>
        <IconType iconName={iconName} key={idx} />
      )}
    </div>
  </div>,
  {},
  { heading: false });
