import React from 'react';
import Container from '../components/Container/Container';
import Heading from '../components/Heading/Heading';
import Divider from '../components/Divider/Divider';
import Text from '../components/Text/Text';
import { card, doc, ns } from 'devcards';

import styles from '../styles/index.css';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);

ns('UserSettingsPage');

card('',
    doc``,
    <div className={cx('clearfix', 'mxn1')}>
        <div className={cx('col', 'col-4', 'px1')}>
            <div className={cx('myn1')}>
                <Text size="m">
                    <div className={cx('bold', 'py1')}>
                        Account basics
                    </div>
                </Text>

                <Text size="m">
                    <div className={cx('bold', 'py1')}>
                        Profile
                    </div>
                </Text>

                <Text size="m">
                    <div className={cx('bold', 'py1')}>
                        Notifications
                    </div>
                </Text>
            </div>

        </div>
        <div className={cx('col', 'col-8', 'px1', 'md-px2')}>
            <div className={cx('p1')}>
                <Heading size="m">Account Basics</Heading>
            </div>
            <Divider />
        </div>
    </div>);
