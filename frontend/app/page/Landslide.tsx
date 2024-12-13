import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import * as Location from "expo-location";

interface LocationType {
  latitude: number;
  longitude: number;
}

const Landslide = () => {
  const [timer, setTimer] = useState(3);
  const [isRunning, setIsRunning] = useState(true);
  const [previousTimer, setPreviousTimer] = useState(3);
  const [location, setLocation] = useState<LocationType | null>(null);

  const getUserLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied.");
        return;
      }

      const userLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      });
    } catch (error) {
      console.error("Error fetching location:", error);
      Alert.alert("Failed to get location. Please try again.");
    }
  };

  const sendEmergencyAlert = async () => {
    if (!location) {
      Alert.alert("Location is not available.");
      return;
    }

    try {
      const response = await fetch("http://192.168.10.60:8000/sos/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "Landslide Alert! Immediate evacuation required.",
          latitude: location.latitude,
          longitude: location.longitude,
        }),
      });

      if (response.ok) {
        Alert.alert("Emergency alert sent successfully!");
      } else {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        Alert.alert("Failed to send emergency alert.");
      }
    } catch (error) {
      console.error("Error sending alert:", error);
      Alert.alert("Error sending emergency alert. Please try again.");
    }
  };

  useEffect(() => {
    if (isRunning && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else if (timer === 0) {
      sendEmergencyAlert();
      setIsRunning(false);
    }
  }, [timer, isRunning]);

  useEffect(() => {
    getUserLocation();
  }, []);

  const handleTimerPress = () => {
    if (isRunning) {
      setIsRunning(false);
      setPreviousTimer(timer);
    } else {
      setIsRunning(true);
      setTimer(previousTimer);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Landslide Emergency Alert</Text>
      <Text style={styles.subtitle}>Act quickly. Time is critical!</Text>
      <TouchableOpacity
        style={styles.timerContainer}
        onPress={handleTimerPress}
      >
        <Text style={styles.timerText}>{`00 : ${timer
          .toString()
          .padStart(2, "0")}`}</Text>
        <Text style={styles.timerSubtitle}>Seconds</Text>
      </TouchableOpacity>
      <Text style={styles.stopInstruction}>Tap the timer to pause/resume</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#1B263B", // Background color remains unchanged
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF", // Changed to white
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#FFFFFF", // Changed to white
    textAlign: "center",
    marginBottom: 20,
  },
  timerContainer: {
    backgroundColor: "#FF5C5C",
    width: 220,
    height: 220,
    borderRadius: 110,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#FF5C5C",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 4,
    borderColor: "#FF4747",
  },
  timerText: {
    fontSize: 48,
    color: "#FFFFFF", // Changed to white
    fontWeight: "bold",
    textShadowColor: "#333333", // This provides a subtle shadow to make the text stand out
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  timerSubtitle: {
    fontSize: 18,
    color: "#FFFFFF", // Changed to white
    marginTop: 8,
  },
  stopInstruction: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF", // Changed to white
    textAlign: "center",
    marginTop: 20,
  },
});

export default Landslide;
