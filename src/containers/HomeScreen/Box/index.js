import React from 'react'
import { Text, View } from 'react-native'
import Header from './Header'
import { Spacing } from '../../../resources'

export default function Box({ title, children, rightAction, style, ...props }) {
    return (
        <View style={[{ margin: Spacing.p10, }, style]}>
            <Header title={title} rightAction={rightAction} />
            <View style={{ flex: 1, borderRadius: 5, borderWidth: 1, borderColor: '#acc', minHeight: 20, padding: Spacing.p5 }}>
                {children}
            </View>
        </View>
    )
}
