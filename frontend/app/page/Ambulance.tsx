import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

interface Ambulance {
  id: string;
  latitude: number;
  longitude: number;
  distance?: number; // Optional distance property
}

const AmbulanceScreen: React.FC = () => {
  const [userLocation, setUserLocation] =
    useState<Location.LocationObject | null>(null);
  const [nearestAmbulance, setNearestAmbulance] = useState<Ambulance | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);

  // Dummy ambulances
  const ambulances: Ambulance[] = [
    { id: "1", latitude: 27.692151, longitude: 84.428722 },
    { id: "2", latitude: 27.680562, longitude: 84.449697 },
    { id: "3", latitude: 27.719, longitude: 85.3148 },
    { id: "4", latitude: 27.71, longitude: 85.307 },
  ];

  // Function to calculate the distance between two points in meters
  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const toRadians = (degree: number) => (degree * Math.PI) / 180;
    const R = 6371000; // Radius of Earth in meters
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in meters
  };

  // Fetch user location and find the nearest ambulance
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        // Request location permissions
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission Denied", "Location permission is required.");
          setLoading(false);
          return;
        }

        // Get user's current location
        const location = await Location.getCurrentPositionAsync({});
        setUserLocation(location);

        // Find ambulances within 1km (1000 meters)
        const nearbyAmbulances = ambulances
          .map((ambulance) => ({
            ...ambulance,
            distance: calculateDistance(
              location.coords.latitude,
              location.coords.longitude,
              ambulance.latitude,
              ambulance.longitude
            ),
          }))
          .filter((ambulance) => ambulance.distance <= 1000); // Filter ambulances within 1km

        // If there are nearby ambulances, set the nearest one
        if (nearbyAmbulances.length > 0) {
          const nearest = nearbyAmbulances.sort(
            (a, b) => a.distance - b.distance
          )[0]; // Nearest ambulance
          setNearestAmbulance(nearest);
        } else {
          setNearestAmbulance(null);
        }
      } catch (error) {
        Alert.alert("Error", "Failed to fetch location.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {userLocation && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: userLocation.coords.latitude,
            longitude: userLocation.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          {/* User's Location */}
          <Marker
            coordinate={{
              latitude: userLocation.coords.latitude,
              longitude: userLocation.coords.longitude,
            }}
            title="User"
            description="Your current location"
            pinColor="red"
          />

          {/* Ambulance Locations within 1km */}
          {ambulances
            .map((ambulance) => ({
              ...ambulance,
              distance: calculateDistance(
                userLocation.coords.latitude,
                userLocation.coords.longitude,
                ambulance.latitude,
                ambulance.longitude
              ),
            }))
            .filter((ambulance) => ambulance.distance <= 1000) // Only show ambulances within 1km
            .map((ambulance) => (
              <Marker
                key={ambulance.id}
                coordinate={{
                  latitude: ambulance.latitude,
                  longitude: ambulance.longitude,
                }}
                title={`Ambulance ${ambulance.id}`}
                description={`Distance: ${ambulance.distance.toFixed(
                  0
                )} meters`}
                pinColor="red"
              />
            ))}

          {/* Nearest Ambulance */}
          {nearestAmbulance && (
            <Marker
              coordinate={{
                latitude: nearestAmbulance.latitude,
                longitude: nearestAmbulance.longitude,
              }}
              title={`Ambulance ${nearestAmbulance.id}`}
              description={`Phone: 985663770`}
              pinColor="green"
            />
          )}
        </MapView>
      )}
      <View style={styles.info}>
        <Text style={styles.infoText}>
          Nearest Ambulance:{" "}
          {nearestAmbulance
            ? `Ambulance ${
                nearestAmbulance.id
              } at ${nearestAmbulance.distance?.toFixed(0)} meters`
            : "No ambulances within 1km"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  info: {
    padding: 10,
    backgroundColor: "white",
    alignItems: "center",
  },
  infoText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AmbulanceScreen;
