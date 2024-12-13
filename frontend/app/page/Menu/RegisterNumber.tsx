import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

const RegisterNumber = () => {
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleRegister = () => {
    // Basic validation
    if (!username.trim()) {
      Alert.alert("Validation Error", "Username is required");
      return;
    }
    if (!phoneNumber.trim() || !/^\d{10}$/.test(phoneNumber)) {
      Alert.alert(
        "Validation Error",
        "Please enter a valid 10-digit phone number"
      );
      return;
    }

    // Handle successful registration (you can replace this with an API call)
    Alert.alert(
      "Success",
      `User ${username} with phone number ${phoneNumber} registered!`
    );
    setUsername("");
    setPhoneNumber("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register Number</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Username"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Phone Number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#34A853",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "green",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default RegisterNumber;
