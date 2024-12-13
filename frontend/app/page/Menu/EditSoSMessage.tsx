import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";

const EditSoSMessage = () => {
  // Dummy data to simulate the SOS message
  const initialSOSMessage = {
    message: "Help! I need assistance.",
    status: "pending",
    response: "",
  };

  const [message, setMessage] = useState(initialSOSMessage.message);
  const [status, setStatus] = useState(initialSOSMessage.status);
  const [response, setResponse] = useState(initialSOSMessage.response);

  // Handle form submission
  const handleSubmit = () => {
    // Log the updated data (in a real app, this would be sent to the backend)
    console.log("Updated SOS Message:", {
      message,
      status,
      response,
    });

    // Show an alert to confirm the update
    Alert.alert("SOS Message Updated", "The SOS message has been updated!");

    // Reset form fields
    setMessage("");
    setStatus("pending");
    setResponse("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit SOS Message</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Message</Text>
        <TextInput
          style={styles.input}
          multiline
          numberOfLines={4}
          value={message}
          onChangeText={setMessage}
          placeholder="Enter the SOS message"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Status</Text>
        <TextInput
          style={styles.input}
          value={status}
          onChangeText={setStatus}
          placeholder="Enter the status (pending, resolved, etc.)"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Response</Text>
        <TextInput
          style={styles.input}
          multiline
          numberOfLines={4}
          value={response}
          onChangeText={setResponse}
          placeholder="Enter a response"
        />
      </View>

      <Button
        title="Update SOS Message"
        onPress={handleSubmit}
        color="#4CAF50"
      />
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
  inputGroup: {
    width: "100%",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    height: 50,
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#fff",
    fontSize: 16,
  },
});

export default EditSoSMessage;
