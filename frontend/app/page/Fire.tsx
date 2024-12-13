import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const EmergencyAlert = () => {
  /**
   * Handles the emergency call action.
   */

  const policeNumber = "103"; // Emergency contact number for police

  const handleEmergencyCall = () => {
    Linking.openURL(`tel:${policeNumber}`);
  };

  return (
    <View style={styles.container}>
      {/* Title and Description */}
      <Text style={styles.title}>Emergency Alert</Text>
      <Text style={styles.subtitle}>
        Tap the button below to make an emergency call.
      </Text>

      {/* Emergency Call Button */}
      <TouchableOpacity
        style={styles.callButtonContainer}
        onPress={handleEmergencyCall}
      >
        <MaterialIcons name="fire-extinguisher" size={30} color="#fff" />
        <Text style={styles.callButtonText}>Call Fire Brigade</Text>
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
    backgroundColor: "#1B263B", // Dark background for emergency theme
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#E74C3C", // Red for emergency
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#D5D8DC", // Light grey for contrast
    marginBottom: 20,
    textAlign: "center",
  },
  callButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E74C3C", // Emergency red button
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  callButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 10,
  },
});

export default EmergencyAlert;
