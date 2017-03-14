import A11YCheck from '../containers/A11YCheck';
import BoxExampleGrid from '../containers/BoxExampleGrid';
import ClassicExampleGrid from '../containers/ClassicExampleGrid';
import MasonryExample from '../containers/MasonryExample';
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
  FlexibleMasonry: {
    Component: MasonryExample,
    styles: flexibleGridServerStyles,
    props: { initialPins: classicPins },
  },
  Masonry: {
    Component: MasonryExample,
    styles: classicGridServerStyles,
    props: { initialPins: classicPins },
  },
};

export default RenderConfig;
