import React, { memo, useEffect, useState } from 'react';
import Svg from 'react-native-svg';
import { useDerivedValue, withTiming } from 'react-native-reanimated';
import AnimatedCheckMarkPath from './AnimatedCheckMarkPath';
import AnimatedColor from './AnimatedColor';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
const CustomCheckBox = memo(({
    value,
    width = 20,
    height = 20,
    checkMarkColor = 'white',
    checkedBorderColor = '#FFA901',
    unCheckedBorderColor = '#D9D9D9',
    checkedBackgroundColor = '#FFA901',
    unCheckedBackgroundColor = 'white',
    onChange, label, styleLabel }) => {
    const [state, _setState] = useState({ value: false });
    const setState = (data = {}) => {
        _setState((state) => {
            return { ...state, ...data };
        });
    };




    useEffect(() => {
        if (value != state.value)
            setState({ value })
    }, [value])
    const progress = useDerivedValue(() => {
        return withTiming(state.value ? 1 : 0);
    });
    const onPress = () => {
        setState({
            value: !state.value
        });
        if (onChange) {
            onChange(!state.value);
        }
    }
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={{ display: 'flex', flexDirection: "row", alignItems: 'center' }}>
                <Svg width={width} height={height} viewBox="0 0 49 49">
                    <AnimatedColor
                        progress={progress}
                        checkedBorderColor={checkedBorderColor}
                        unCheckedBorderColor={unCheckedBorderColor}
                        checkedBackgroundColor={checkedBackgroundColor}
                        unCheckedBackgroundColor={unCheckedBackgroundColor}
                    />
                    <AnimatedCheckMarkPath
                        progress={progress}
                        checkMarkColor={checkMarkColor}
                    />
                </Svg>
                <Text style={styleLabel}>{label}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
});

export default CustomCheckBox;