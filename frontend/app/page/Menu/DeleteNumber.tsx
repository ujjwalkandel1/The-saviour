import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface User {
  id: string;
  username: string;
  phoneNumber: string;
}

const DeleteNumber = () => {
  // Sample data for registered numbers
  const [users, setUsers] = useState<User[]>([
    { id: "1", username: "John Doe", phoneNumber: "1234567890" },
    { id: "2", username: "Jane Smith", phoneNumber: "9876543210" },
    { id: "3", username: "Alice Johnson", phoneNumber: "5556667777" },
  ]);

  const handleDelete = (userId: string) => {
    // Show confirmation alert before deleting
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this user?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            // Remove the user from the list
            setUsers((prevUsers) =>
              prevUsers.filter((user) => user.id !== userId)
            );
            Alert.alert("Success", "User deleted successfully!");
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: User }) => (
    <View style={styles.itemContainer}>
      <View style={styles.userInfo}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.phoneNumber}>{item.phoneNumber}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id)}
      >
        <FontAwesome name="trash" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registered Numbers</Text>
      {users.length > 0 ? (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      ) : (
        <Text style={styles.noUsersText}>No registered numbers found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#d9534f",
    marginBottom: 20,
    textAlign: "center",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  phoneNumber: {
    fontSize: 14,
    color: "#666",
  },
  deleteButton: {
    backgroundColor: "#d9534f",
    borderRadius: 8,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  noUsersText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
});

export default DeleteNumber;
