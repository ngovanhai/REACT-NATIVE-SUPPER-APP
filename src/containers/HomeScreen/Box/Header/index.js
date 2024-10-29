import React from 'react'
import { View, Text } from 'react-native'
import { Fonts, Spacing } from '../../../../resources'

export default function Header({ title, rightAction, ...props }) {
    return (
        <View style={{ marginBottom: Spacing.p5, justifyContent: 'space-between', flexDirection: 'row' }}><Text style={{ color: '#FFF', ...Fonts.font13w700 }}>{title}</Text>{rightAction}</View>
    )
}
