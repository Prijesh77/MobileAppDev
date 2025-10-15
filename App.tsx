import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

export default function App() {
  const [name, setName] = useState("");

  const handlePress = () => {
    if (name.trim() === "") {
      Alert.alert("Input Required", "Please enter your name!");
    } else {
      Alert.alert("Welcome", `Hello, ${name}! This app is built with React Native.`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Native Demo App</Text>

      <Text style={styles.label}>Enter your name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Type here..."
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      {name !== "" && (
        <Text style={styles.greeting}>👋 Hi {name}, welcome to React Native!</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#00ffcc",
  },
  label: {
    fontSize: 16,
    color: "#ffffff",
    marginBottom: 8,
  },
  input: {
    width: "80%",
    height: 45,
    borderColor: "#00ffcc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: "#fff",
  },
  button: {
    backgroundColor: "#00ffcc",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#121212",
  },
  greeting: {
    fontSize: 18,
    color: "#ffffff",
    marginTop: 10,
  },
});
