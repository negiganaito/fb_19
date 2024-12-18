const { CometGHLRenderingContext } = require('@fb-contexts/CometGHLRenderingContext');
const { useCometTheme } = require('@fb-hooks/useCometTheme');
const { useContext } = require('react');
const { useRef } = require('react');
const { forwardRef } = require('react');

const FDSButton = forwardRef((props, ref) => {
  const {
    addOnPrimary,
    addOnSecondary,
    disabled = false,
    icon,
    id,
    label,
    labelIsHidden = false,
    linkProps,
    onFocusIn,
    onFocusOut,
    onHoverIn,
    onHoverOut,
    onPress,
    onPressIn,
    onPressOut,
    padding = 'normal',
    reduceEmphasis = false,
    showDynamicHover,
    size = 'medium',
    suppressHydrationWarning = false,
    testid,
    testOnly_pressed = false,
    tooltip,
    tooltipPosition = 'above',
    type = 'primary',
    ...rest
  } = props;

  const J = type === 'fdsOverride_collaborativePostCTA' ? 'secondary' : type in m ? type : 'primary';

  let L = disabled ? 'disabled' : reduceEmphasis ? 'deemphasized' : 'default';

  let M = m[J][L];

  const internalRef = useRef(null);

  const [ThemeWrapper, themeClassName] = useCometTheme('light');

  const ghlRenderingContext = useContext(CometGHLRenderingContext);
  const cometGHLRenderingWithLink = linkProps && ghlRenderingContext;
  const _label = rest['aria-label'] ?? label; // N
});

const m = {
  'dark-overlay': {
    deemphasized: 'white',
    default: 'white',
    disabled: 'disabled',
  },
  overlay: {
    deemphasized: 'white',
    default: 'primary',
    disabled: 'disabled',
  },
  primary: {
    deemphasized: 'highlight',
    default: 'white',
    disabled: 'disabled',
  },
  secondary: {
    deemphasized: 'highlight',
    default: 'secondary',
    disabled: 'disabled',
  },
};
