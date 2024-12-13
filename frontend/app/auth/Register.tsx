import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import axios from "axios";
import { useRouter } from "expo-router";

interface RegisterData {
  name: string;
  phone_number: number;
  password: string;
}

const Register: React.FC = () => {
  const router = useRouter();

  const [username, setName] = useState<string>("");
  const [phone_number, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleRegister = async () => {
    const apiUrl = "http://192.168.10.60:8000/account/register/"; // Replace with your API endpoint
    const payload = {
      username,
      phone_number,
      password,
    };

    try {
      const response = await axios.post(apiUrl, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        Alert.alert("Success", "Registration successful!");
        // Optionally clear form inputs
        setName("");
        setPhoneNumber("");
        setPassword("");
      } else {
        Alert.alert("Error", response.data.message || "Registration failed!");
      }
    } catch (error: any) {
      if (error.response) {
        // Server responded with a status other than 200 range
        Alert.alert(
          "Error",
          error.response.data.message || "Something went wrong!"
        );
      } else {
        // Network error or other issues
        Alert.alert("Error", "An error occurred. Please try again.");
      }
      console.error("Error during registration:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Join us to stay safe and connected</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={username}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone_number}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity onPress={handleRegister} style={styles.button}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/auth/Login")}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "red",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#6c757d",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#ffffff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    borderColor: "#ced4da",
    borderWidth: 1,
  },
  button: {
    backgroundColor: "#FF0000",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
  link: {
    color: "#FF0000",
    textAlign: "center",
    marginTop: 10,
  },
});

export default Register;
