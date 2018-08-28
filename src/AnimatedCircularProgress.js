import React from 'react';
import PropTypes from 'prop-types';
import { Animated, AppState, Easing, View, ViewPropTypes } from 'react-native';
import CircularProgress from './CircularProgress';
const AnimatedProgress = Animated.createAnimatedComponent(CircularProgress);

export default class AnimatedCircularProgress extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      fillAnimation: new Animated.Value(props.prefill),
      fillAnimation2: new Animated.Value(props.prefill),
      fillAnimation3: new Animated.Value(props.prefill),
    };
  }

  componentDidMount() {
    this.animate();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.fill !== this.props.fill) {
      this.animate();
    }
  }

  animate(toVal, dur, ease) {
    const toValue = toVal || this.props.fill;
    const duration = dur || this.props.duration;
    const easing = ease || this.props.easing;

    const toValue2 = toVal || this.props.fill2;
    const toValue3 = toVal || this.props.fill3;

    console.log(toValue, toValue2, toValue3);

    Animated.timing(this.state.fillAnimation2, {
      toValue: toValue2,
      easing,
      duration,
    }).start();

    Animated.timing(this.state.fillAnimation3, {
      toValue: toValue3,
      easing,
      duration,
    }).start();

    return Animated.timing(this.state.fillAnimation, {
      toValue,
      easing,
      duration,
    }).start(this.props.onAnimationComplete);
  }

  render() {
    const { fill, prefill, ...other } = this.props;

    return (
      <AnimatedProgress
        {...other}
        fill={this.state.fillAnimation}
        fill2={this.state.fillAnimation2}
        fill3={this.state.fillAnimation3}
      />
    );
  }
}

AnimatedCircularProgress.propTypes = {
  ...CircularProgress.propTypes,
  prefill: PropTypes.number,
  duration: PropTypes.number,
  easing: PropTypes.func,
  onAnimationComplete: PropTypes.func,
};

AnimatedCircularProgress.defaultProps = {
  duration: 500,
  easing: Easing.out(Easing.ease),
  prefill: 0,
};
