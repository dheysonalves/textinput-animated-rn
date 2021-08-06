import { StatusBar } from 'expo-status-bar';
import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text } from "react-native";

import FloatingInput from './components/floatingInput/floatingInput';

export default function App() {
  const [value, setValue] = useState<string>('');

  const handleTextChange = useCallback((text: string) => {
    setValue(text);
  }, []);

  return (
		<View style={styles.container}>
			<StatusBar hidden />
			<Text style={styles.header}>Floating Input Component</Text>
			<Text style={styles.paragraph}>
				A simple TextInput with animated label
			</Text>
			<FloatingInput
				label="Email"
				value={value}
				onChangeText={handleTextChange}
			/>
			<StatusBar style="auto" />
		</View>
  );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		justifyContent: "center",
		padding: 20,
	},
	header: {
		fontSize: 24,
		fontWeight: "bold",
		textTransform: "uppercase",
	},
	paragraph: {
		fontSize: 14,
    fontWeight: '400',
    marginBottom: 24
	},
});
