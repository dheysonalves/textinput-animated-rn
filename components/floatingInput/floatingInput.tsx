import React, { Component, useState, useCallback, useEffect } from "react";
import {
	View,
	TextInput,
	Animated,
} from "react-native";

import { InputProps } from './floatingInput.types';

const floatingInput = ({label, ...rest}: InputProps) => {
	const [isFocused, setIsFocused] = useState<boolean>(false);
  	const [animatedIsFocused, setAnimatedIsFocused] = useState(new Animated.Value(rest.value === '' ? 0 : 1));

	const handleFocus = useCallback(() => {
		setIsFocused(true);
	}, []);

	const handleBlur = useCallback(() => {
		setIsFocused(false);
	}, []);

	useEffect(() => {
		setAnimatedIsFocused(new Animated.Value(rest.value === "" ? 0 : 1));
	}, []);

	useEffect(() => {
		Animated.timing(animatedIsFocused, {
			toValue: isFocused || rest.value !== "" ? 1 : 0,
			duration: 200,
			useNativeDriver: false,
		}).start();
	}, [animatedIsFocused, isFocused, rest.value]);

	const labelStyle = {
		position: "absolute",
		left: 0,
		top: animatedIsFocused.interpolate({
			inputRange: [0, 1],
			outputRange: [18, 0],
		}),
		fontSize: animatedIsFocused.interpolate({
			inputRange: [0, 1],
			outputRange: [20, 14],
		}),
		color: animatedIsFocused.interpolate({
			inputRange: [0, 1],
			outputRange: ["#aaa", "#000"],
		}),
	};

	return (
		<View style={{ paddingTop: 18 }}>
			<Animated.Text style={labelStyle}>{label}</Animated.Text>
			<TextInput
				{...rest}
				style={{
					height: 26,
					fontSize: 20,
					color: "#000",
					borderBottomWidth: 1,
					borderBottomColor: "#555",
					paddingBottom: 5,
				}}
				onFocus={handleFocus}
				onBlur={handleBlur}
				blurOnSubmit
			/>
		</View>
	);
};

export default floatingInput;
