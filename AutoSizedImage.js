import React from 'react';
import {
  Image,
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('window');

const baseStyle = {
  backgroundColor: 'transparent',
};

export default class AutoSizedImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // set width 1 is for preventing the warning
      // You must specify a width and height for the image %s
      width: this.props.style.width || 1,
      height: this.props.style.height || 1,
    };
  }

  componentDidMount() {
    //avoid repaint if width/height is given
    if (this.props.style.width || this.props.style.height) {
      return;
    }
    Image.getSize(this.props.source.uri, (w, h) => {
      this.setState({width: w, height: h});
    });
  }

  render() {
    const finalSize = {};
    console.log(this.state);
    if (this.state.width > width - 20) {
      finalSize.width = width - 20;
      const ratio = finalSize.width / this.state.width;
      finalSize.height = this.state.height * ratio;
    }
    const style = Object.assign(
      baseStyle,
      // { height: 300, width: width - 20, resizeMode: Image.resizeMode.cover,},
      this.props.style,
      // this.state,
      {width: 150, height: 150},
      finalSize,
      // {resizeMode: 'contain',}
    );
    let source = {};
    if (!finalSize.width || !finalSize.height) {
      source = Object.assign(source, this.props.source, this.state);
    } else {
      source = Object.assign(source, this.props.source, finalSize);
    }

    return <Image style={[style, { marginTop: 10, marginBottom: 30 }]} source={source} />;
  }
}
