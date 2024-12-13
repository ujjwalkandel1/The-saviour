import React, { useState, useEffect } from "react";
import { View, Text, Button, Alert, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker"; // Import the Picker

const EditTimer = () => {
  const [time, setTime] = useState(3); // Default to 3 seconds
  const [isRunning, setIsRunning] = useState(false); // Timer running status
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null); // Timer reference

  useEffect(() => {
    // Cleanup timer when the component is unmounted or timer is stopped
    if (timerId) {
      return () => clearInterval(timerId);
    }
  }, [timerId]);

  // Function to handle start/stop of the timer
  const handleStartStop = () => {
    if (isRunning) {
      // Stop the timer
      if (timerId) {
        clearInterval(timerId);
      }
      setTimerId(null);
    } else {
      // Start the timer
      const newTimerId = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 0) {
            clearInterval(newTimerId); // Stop timer when it reaches 0
            Alert.alert("Timer Finished", "The timer has completed!");
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      setTimerId(newTimerId);
    }
    setIsRunning(!isRunning);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Timer</Text>

      {/* Dropdown Picker for selecting time */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Select Timer (in seconds)</Text>
        <Picker
          selectedValue={time}
          style={styles.picker}
          onValueChange={(itemValue) => setTime(itemValue)}
        >
          <Picker.Item label="3 seconds" value={3} />
          <Picker.Item label="5 seconds" value={5} />
          <Picker.Item label="10 seconds" value={10} />
          <Picker.Item label="15 seconds" value={15} />
          <Picker.Item label="30 seconds" value={30} />
        </Picker>
      </View>
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
  picker: {
    width: "100%",
    height: 60,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  timerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20,
    color: "#000",
  },
});

export default EditTimer;
