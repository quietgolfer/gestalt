import React from 'react';
import Container from '../components/Container/Container';
import Heading from '../components/Heading/Heading';
import Avatar from '../components/Avatar/Avatar';
import Mask from '../components/Mask/Mask';
import Divider from '../components/Divider/Divider';
import Image from '../components/Image/Image';
import Text from '../components/Text/Text';
import { card, doc, ns } from 'devcards';

import styles from '../styles/index.css';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

ns('Pin');

function formatNumber(n) {
    return '2.3k'
}

function PinTitle(props) {
    const {
        rePinCount,
        title
    } = props;
    return (
        <div className={cx('flex', 'items-baseline')}>
            <div className={cx('flex-auto')}>
                <Text size="m" bold>
                    {title}
                </Text>
            </div>
            <div className={cx('ml2')}>
                <Text color="light-gray" size="xs" bold>
                    {formatNumber(rePinCount)}
                </Text>
            </div>
        </div>
    );
}

function PinCommerce(props) {
    return (
        <div>
            <Text color="blue" bold size="m">$000.00</Text>
            <Text size="m" bold>Lorem ipsum dolor sit amet</Text>
        </div>
    );
}

function PinDescription() {
    return (
        <Text size="s">This image just has a small description</Text>
    );
}

function PinPublisher(props) {
    return (
        <Text size="xs" color="light-gray">
            <span>From</span>
            {' '}
            <a className={cx('bold', 'light-gray')}>Ceramics</a>
        </Text>
    );
}

function Pin(props) {
    return (
        <div>
            <div className={cx('mb1')}>
                <Mask type="rounded">
                    <Image
                        alt="example.com"
                        color="#CCC"
                        height={750}
                        src="https://s-media-cache-ak0.pinimg.com/564x/5a/da/e7/5adae7e3e6cd31a86f9a6608618f3a30.jpg"
                        placeholder="example.com"
                        width={500}
                    />
                </Mask>
            </div>

            <div className={cx('p1', 'sm-p2')}>
                {PinTitle({
                    title: "Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet",
                    rePinCount: 2300
                })}
            </div>

            <div className={cx('p1', 'sm-p2')}>
                {PinTitle({
                    title: "Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet"
                })}
            </div>

            <div className={cx('p1', 'sm-p2')}>
                {PinCommerce()}
            </div>

            <div className={cx('p1', 'sm-p2')}>
                {PinDescription()}
            </div>

            <div className={cx('p1', 'sm-p2')}>
                {PinPublisher()}
            </div>
        </div>
    );
}


card('',
    doc``,
    <div style={{width: 236}}>
        {Pin()}
    </div>);
