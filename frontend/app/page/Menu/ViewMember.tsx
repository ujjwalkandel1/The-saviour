import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

interface Member {
  id: string;
  name: string;
  phoneNumber: string;
}

const ViewMember = () => {
  // Sample members data
  const [members] = useState<Member[]>([
    { id: "1", name: "John Doe", phoneNumber: "9876543210" },
    { id: "2", name: "Jane Smith", phoneNumber: "9876543211" },
    { id: "3", name: "Michael Brown", phoneNumber: "9876543212" },
  ]);

  const renderMember = ({ item }: { item: Member }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.phoneNumber}>Phone: {item.phoneNumber}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>View Members</Text>
      {members.length > 0 ? (
        <FlatList
          data={members}
          keyExtractor={(item) => item.id}
          renderItem={renderMember}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.noMembersText}>No members available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#34A853",
    textAlign: "center",
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  phoneNumber: {
    fontSize: 16,
    color: "#555",
  },
  noMembersText: {
    textAlign: "center",
    fontSize: 16,
    color: "#999",
  },
});

export default ViewMember;
