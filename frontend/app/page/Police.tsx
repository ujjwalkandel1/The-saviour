import React from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const PoliceEmergencyScreen = () => {
  const router = useRouter();
  const policeNumber = "100"; // Emergency contact number for police

  // Function to directly open the phone app and initiate a call
  const handleEmergencyCall = () => {
    Linking.openURL(`tel:${policeNumber}`);
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      {/* <Image
        source={require("../assets/police-logo.png")} // Replace with actual police logo path
        style={styles.logo}
      /> */}

      {/* Title and Description */}
      <Text style={styles.title}>Police Emergency Alert</Text>
      <Text style={styles.subtitle}>
        Tap the button below to contact the nearest police station.
      </Text>

      {/* Emergency Call Button */}
      <TouchableOpacity
        style={styles.callButtonContainer}
        onPress={handleEmergencyCall}
      >
        <MaterialIcons name="local-police" size={60} color="#FFF" />
        <Text style={styles.callButtonText}>Call Police</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1B263B", // Dark background for police theme
    paddingVertical: 40,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    resizeMode: "contain", // Ensures the logo fits well
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFD700", // Golden yellow for police theme
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#D5D8DC", // Light grey for readability
    textAlign: "center",
    marginBottom: 30,
    padding: 5,
  },
  callButtonContainer: {
    backgroundColor: "#4A90E2", // Police blue theme
    width: 200,
    height: 200,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#4A90E2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  callButtonText: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "bold",
    marginTop: 10,
  },
});

export default PoliceEmergencyScreen;
