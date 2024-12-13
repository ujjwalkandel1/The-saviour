import { useNavigation, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { RelativePathString } from "expo-router";
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import * as Location from "expo-location";
import { useAuth } from "./context/AuthContext";
// Emergency options
const emergencyOptions: {
  label: string;
  emoji: string;
  color: string;
  route: RelativePathString;
}[] = [
  {
    label: "Flood",
    emoji: "🌊",
    color: "#EBF5FB",
    route: "/page/Flood" as RelativePathString,
  },
  {
    label: "Landslide",
    emoji: "⛰️",
    color: "#F9EBEA",
    route: "/page/Landslide" as RelativePathString,
  },
  {
    label: "Fire Brigade",
    emoji: "🚒",
    color: "#FDEDEC",
    route: "/page/Fire" as RelativePathString,
  },
  {
    label: "Ambulance",
    emoji: "🚑",
    color: "#F5EEF8",
    route: "/page/Ambulance" as RelativePathString,
  },
  {
    label: "Police",
    emoji: "👮",
    color: "#E9F7EF",
    route: "/page/Police" as RelativePathString,
  },
  {
    label: "Help Desk",
    emoji: "👨‍💻",
    color: "#EAF2F8",
    route: "/page/HelpDesk" as RelativePathString,
  },
];

export default function Home() {
  const { logout } = useAuth(); // Use the logout function from your AuthContext

  const [location, setLocation] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const router = useRouter();

  const navigation = useNavigation();
  navigation.setOptions({
    headerShown: false,
  });

  useEffect(() => {
    (async () => {
      // Request permission to access location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied.");
        return;
      }

      // Get current location
      let loc = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = loc.coords;

      // Reverse geocode to get human-readable address
      let address = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      // Combine address components
      if (address && address.length > 0) {
        const addr = address[0];
        const fullAddress = `${addr.street || "++"},  ${addr.city || ""}, ${
          addr.district || ""
        }, ${addr.region || ""}, ${addr.country || ""}`;
        setLocation(fullAddress);
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Set the status bar color */}
      <StatusBar backgroundColor="#FF0000" barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/images/sos/person.png")} // Replace with your logo URL
            style={styles.logo}
          />
        </View>
        <View style={styles.locationContainer}>
          <Text style={styles.currentLocation}>Current location:</Text>
          <Text style={styles.address}>
            {location || errorMsg || "Fetching location..."}
          </Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Text style={styles.icon}>🔔</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Emergency Title Section with Illustration */}
      <View style={styles.emergencyContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Are you in an emergency?</Text>
          <Text style={styles.description}>
            Press the SOS button, your live location will be shared with the
            nearest help center and your emergency contacts.
          </Text>
        </View>
        <Image
          source={require("../assets/images/sos/disaster.png")} // Correctly referencing a local image
          style={styles.logo1}
        />
      </View>

      {/* SOS Button */}
      {/* <View style={styles.sosContainer}>
        <TouchableOpacity style={styles.sosButton}>
          <Text style={styles.sosText}>SOS</Text>
        </TouchableOpacity>
      </View> */}
      {/* <Image
        source={require("../assets/images/sos/dangerLogo.png")} // Correctly referencing a local image
        style={styles.logo}
      /> */}

      {/* Emergency Options */}

      <Text style={styles.emergencyTitle}>What's your emergency?</Text>
      <View style={styles.emergencyGrid}>
        {emergencyOptions.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.emergencyOption, { backgroundColor: item.color }]}
            onPress={() => router.push(item.route)} // Navigate to the specified route
          >
            <Text style={styles.emergencyIcon}>{item.emoji}</Text>
            <Text style={styles.emergencyText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerItem}
          onPress={() => {
            // Handle Home action
          }}
        >
          <Text style={styles.footerIcon}>🏠</Text>
          <Text style={styles.footerText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.footerItem}
          onPress={() => {
            logout(); // Call logout when "Logout" is clicked
          }}
        >
          <Text style={styles.footerIcon}>🚪</Text>
          <Text style={styles.footerText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: 25,
    marginTop: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
  },
  logoContainer: {
    marginRight: 10,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  locationContainer: {
    flex: 1,
  },
  currentLocation: {
    fontSize: 12,
    color: "#888",
  },
  address: {
    fontSize: 14,
    fontWeight: "bold",
  },
  headerIcons: {
    flexDirection: "row",
  },
  icon: {
    fontSize: 20,
    marginLeft: 15,
  },
  emergencyContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 25,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    margin: 20,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginTop: 50,
  },
  textContainer: {
    flex: 1,
    marginRight: 15,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginTop: 10,
  },
  logo1: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },
  illustration: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  sosContainer: {
    alignItems: "center",
    marginVertical: 15,
  },
  sosButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  sosText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
  },
  sosSubText: {
    fontSize: 12,
    color: "#FFF",
    marginTop: 5,
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginVertical: 5,
    marginTop: 60,
  },
  emergencyGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  emergencyOption: {
    flexBasis: "30%",
    aspectRatio: 1,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
  emergencyIcon: {
    fontSize: 20,
    marginBottom: 10,
  },
  emergencyText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#FFFFFF",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  footerItem: {
    alignItems: "center",
  },
  footerIcon: {
    fontSize: 24,
  },
  footerText: {
    fontSize: 12,
    marginTop: 5,
    color: "#666",
  },
});
