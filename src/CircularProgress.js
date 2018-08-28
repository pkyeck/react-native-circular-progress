import React from 'react';
import PropTypes from 'prop-types';
import { View, ViewPropTypes } from 'react-native';
import { Svg, Path, G } from 'react-native-svg';
import cornerArc from 'svg-arc-corners';

export default class CircularProgress extends React.PureComponent {
  polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  }

  circlePath(x, y, radius, startAngle, endAngle) {
    const arc = cornerArc([x, y], radius, startAngle, endAngle, 20, 10);
    return arc;
  }

  clampFill = fill => Math.min(100, Math.max(0, fill));

  render() {
    const {
      size,
      width,
      backgroundWidth,
      tintColor,
      backgroundColor,
      style,
      rotation,
      lineCap,
      arcSweepAngle,
      fill,
      fill2,
      fill3,
      children,
    } = this.props;

    const startX = size / 2;
    const startY = size / 2;
    const radius = size / 2 - width / 2;
    const radius2 = size / 2 - (width + 44) / 2;
    const radius3 = size / 2 - (width + 88) / 2;

    const thickness = 20;
    const cornerRadius = 10;

    const backgroundPath = cornerArc(
      [startX, startY],
      radius,
      0,
      arcSweepAngle,
      thickness,
      cornerRadius
    );
    const circlePath = cornerArc(
      [startX, startY],
      radius,
      0,
      (arcSweepAngle * this.clampFill(fill)) / 100,
      thickness,
      cornerRadius
    );
    const backgroundPath2 = cornerArc(
      [startX, startY],
      radius2,
      0,
      arcSweepAngle,
      thickness,
      cornerRadius
    );
    const circlePath2 = cornerArc(
      [startX, startY],
      radius2,
      0,
      (arcSweepAngle * this.clampFill(fill2)) / 100,
      thickness,
      cornerRadius
    );
    const backgroundPath3 = cornerArc(
      [startX, startY],
      radius3,
      0,
      arcSweepAngle,
      thickness,
      cornerRadius
    );
    const circlePath3 = cornerArc(
      [startX, startY],
      radius3,
      0,
      (arcSweepAngle * this.clampFill(fill3)) / 100,
      thickness,
      cornerRadius
    );
    const offset = size - width * 2;

    const childContainerStyle = {
      position: 'absolute',
      left: width,
      top: width,
      width: offset,
      height: offset,
      borderRadius: offset / 2,
      alignItems: 'center',
      justifyContent: 'center',
    };

    return (
      <View style={style}>
        <Svg width={size} height={size} style={{ backgroundColor: 'transparent' }}>
          <G rotation={rotation} originX={size / 2} originY={size / 2}>
            <Path
              d={backgroundPath}
              fill="#F71E58"
              fillOpacity="0.25"
              fillRule="evenodd"
              strokeLinecap={lineCap}
            />
            <Path d={circlePath} fill="#F71E58" fillRule="evenodd" strokeLinecap={lineCap} />

            <Path
              d={backgroundPath2}
              fill="#D1FD35"
              fillOpacity="0.25"
              fillRule="evenodd"
              strokeLinecap={lineCap}
            />
            <Path d={circlePath2} fill="#D1FD35" fillRule="evenodd" strokeLinecap={lineCap} />

            <Path
              d={backgroundPath3}
              fill="#28DFF9"
              fillOpacity="0.25"
              fillRule="evenodd"
              strokeLinecap={lineCap}
            />
            <Path d={circlePath3} fill="#28DFF9" fillRule="evenodd" strokeLinecap={lineCap} />
          </G>
        </Svg>
        {children && <View style={childContainerStyle}>{children(fill)}</View>}
      </View>
    );
  }
}

CircularProgress.propTypes = {
  style: ViewPropTypes.style,
  size: PropTypes.number.isRequired,
  fill: PropTypes.number.isRequired,
  fill2: PropTypes.number.isRequired,
  fill3: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  backgroundWidth: PropTypes.number,
  tintColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  rotation: PropTypes.number,
  lineCap: PropTypes.string,
  arcSweepAngle: PropTypes.number,
  children: PropTypes.func,
};

CircularProgress.defaultProps = {
  tintColor: 'black',
  rotation: 90,
  lineCap: 'butt',
  arcSweepAngle: 360,
};
