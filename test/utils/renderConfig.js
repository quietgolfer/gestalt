import A11YCheck from '../containers/A11YCheck';
import BoxExampleGrid from '../containers/BoxExampleGrid';
import ClassicExampleGrid from '../containers/ClassicExampleGrid';
import FlexibleExampleGrid from '../containers/FlexibleExampleGrid';
import TenzingExampleGrid from '../containers/TenzingExampleGrid';
import classicGridServerStyles from '../containers/classicGridServerStyles';
import flexibleGridServerStyles from '../containers/flexibleGridServerStyles';
import { classicPins, boxPackingPins } from './pins';

const RenderConfig = {
  A11y: {
    Component: A11YCheck,
  },
  BoxGrid: {
    Component: BoxExampleGrid,
    props: { initialPins: boxPackingPins },
  },
  ClassicGrid: {
    Component: ClassicExampleGrid,
    styles: classicGridServerStyles,
    props: { initialPins: classicPins },
  },
  FlexibleGrid: {
    Component: FlexibleExampleGrid,
    styles: flexibleGridServerStyles,
    props: { initialPins: classicPins },
  },
  TenzingGrid: {
    Component: TenzingExampleGrid,
    styles: classicGridServerStyles,
    props: { initialPins: classicPins },
  },
};

export default RenderConfig;
