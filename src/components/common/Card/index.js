import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import Block from '@components/common/Block';
import { Sizes } from '../../../resources';
export default class Card extends Component {
  render() {
    const { color, style, children, ...props } = this.props;
    const cardStyles = [
      styles.card,
      style,
    ];
    return (
      <Block color={color || Colors.white} style={cardStyles} {...props}>
        {children}
      </Block>
    )
  }
}
export const styles = StyleSheet.create({
  card: {
    borderRadius: Sizes.radius,
    padding: Sizes.base + 4,
    marginBottom: Sizes.base,
  },
})