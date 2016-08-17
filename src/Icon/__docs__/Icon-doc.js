import React from 'react';
import Icon from '../Icon';
import { card, doc, ns } from 'devcards';

ns('Icon');

card('Icon',
  doc`# Icon

By default an icon is rendered in medium size and a light-gray color`,
  null, {}, { heading: false });

card('Icon colors',
  doc`## Colors`,
  <div>
    <div className="flex mxn2">
      <div className="col-2 px2 center">
        <h5>light-gray</h5>
        <Icon icon="pin" label="Pin" size={21} color="light-gray" />
      </div>
      <div className="col-2 px2 center">
        <h5>dark-gray</h5>
        <Icon icon="pin" label="Pin" size={21} color="dark-gray" />
      </div>
      <div className="col-2 px2 center">
        <h5>white</h5>
        <div
          className="flex flex-column items-center circle mr-auto ml-auto"
          style={{
            backgroundColor: '#555',
            boxSizing: 'border-box',
            height: 26,
            marginTop: '-4px',
            paddingTop: '4px',
            width: 26,
          }}
        >
          <Icon icon="pin" label="Pin" size={21} color="white" />
        </div>
      </div>
      <div className="col-2 px2 center">
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
    <div className="flex mxn2">
      <div className="col-2 px2 center">
        <h5>12</h5>
        <Icon icon="pin" label="Pin" size={12} />
      </div>
      <div className="col-2 px2 center">
        <h5>14</h5>
        <Icon icon="pin" label="Pin" size={14} />
      </div>
      <div className="col-2 px2 center">
        <h5>16</h5>
        <Icon icon="pin" label="Pin" size={16} />
      </div>
      <div className="col-2 px2 center">
        <h5>18</h5>
        <Icon icon="pin" label="Pin" size={18} />
      </div>
      <div className="col-2 px2 center">
        <h5>20</h5>
        <Icon icon="pin" label="Pin" size={20} />
      </div>
    </div>
    <div className="flex mxn2">
      <div className="col-2 px2 center">
        <h5>24</h5>
        <Icon icon="pin" label="Pin" size={24} />
      </div>
      <div className="col-2 px2 center">
        <h5>28</h5>
        <Icon icon="pin" label="Pin" size={28} />
      </div>
      <div className="col-2 px2 center">
        <h5>32</h5>
        <Icon icon="pin" label="Pin" size={32} />
      </div>
      <div className="col-2 px2 center">
        <h5>36</h5>
        <Icon icon="pin" label="Pin" size={36} />
      </div>
      <div className="col-2 px2 center">
        <h5>40</h5>
        <Icon icon="pin" label="Pin" size={40} />
      </div>
    </div>
  </div>,
  {},
  { heading: false });

card('Icon types',
  doc`## Types`,
  <div>
    <div className="flex mxn2">
      <div className="col-2 px2 center">
        <h5>comments</h5>
        <Icon icon="comments" label="Comments" size={21} color="light-gray" />
      </div>
      <div className="col-2 px2 center">
        <h5>edit</h5>
        <Icon icon="edit" label="Edit" size={21} color="light-gray" />
      </div>
      <div className="col-2 px2 center">
        <h5>filter</h5>
        <Icon icon="filter" label="Filter" size={21} color="light-gray" />
      </div>
      <div className="col-2 px2 center">
        <h5>likes</h5>
        <Icon icon="likes" label="Likes" size={21} color="light-gray" />
      </div>
      <div className="col-2 px2 center">
        <h5>more</h5>
        <Icon icon="more" label="More" size={21} color="light-gray" />
      </div>
      <div className="col-2 px2 center">
        <h5>pin</h5>
        <Icon icon="pin" label="Pin" size={21} color="light-gray" />
      </div>
      <div className="col-2 px2 center">
        <h5>search</h5>
        <Icon icon="search" label="Search" size={21} color="light-gray" />
      </div>
      <div className="col-2 px2 center">
        <h5>send</h5>
        <Icon icon="send" label="Send" size={21} color="light-gray" />
      </div>
    </div>
  </div>,
  {},
  { heading: false });
