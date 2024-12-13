import React from "react";
import {
  View,
  Text,
  SectionList,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

// Define TypeScript interfaces
interface Contact {
  name: string;
  phone: string;
  icon: string;
}

interface HelpDeskSection {
  title: string;
  data: Contact[];
}

// Help desk data with proper types
const helpDeskData: HelpDeskSection[] = [
  {
    title: "Local Government Officials",
    data: [
      { name: "Mayor Office", phone: "9851166003", icon: "account-balance" },
      { name: "Ward Office 10", phone: "9855054195", icon: "location-city" },
    ],
  },
  {
    title: "Emergency Numbers",
    data: [
      { name: "Traffic Support", phone: "103", icon: "traffic" },
      { name: "Child Helpline", phone: "104", icon: "child-care" },
      {
        name: "CIAA (Investigation of Abuse of Authority)",
        phone: "102",
        icon: "gavel",
      },
      { name: "CWIN Helpline", phone: "1098", icon: "phone" },
      { name: "Tourist Police", phone: "114", icon: "person-pin" },
      { name: "Weather and Flood", phone: "1155", icon: "water-damage" },
    ],
  },
];

const HelpDesk = () => {
  /**
   * Calls the given phone number by opening the dialer.
   * @param {string} phoneNumber - The phone number to call.
   */
  const callNumber = (phoneNumber: string) => {
    const url = `tel:${phoneNumber}`;
    Linking.openURL(url).catch((err) =>
      console.error("Error opening dialer", err)
    );
  };

  /**
   * Renders a single contact item.
   * @param {Object} item - The contact object containing details.
   */
  const renderContact = ({ item: contact }: { item: Contact }) => (
    <TouchableOpacity
      style={styles.contactItem}
      onPress={() => callNumber(contact.phone)}
    >
      <MaterialIcons
        name={contact.icon}
        size={24}
        color="#FFF"
        style={styles.icon}
      />
      <View>
        <Text style={styles.contactName}>{contact.name}</Text>
        <Text style={styles.contactPhone}>{contact.phone}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Disaster Help Desk</Text>
      <SectionList
        sections={helpDeskData}
        keyExtractor={(contact, index) => contact.name + index}
        renderItem={renderContact}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#1B263B", // Disaster-themed dark background
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#E74C3C", // Emergency red color
    marginBottom: 16,
    textAlign: "center",
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "700",
    color: "#F4D03F", // Yellow for high visibility
    marginTop: 16,
    marginBottom: 8,
  },
  listContainer: {
    paddingBottom: 16,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#34495E", // Secondary dark shade for cards
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 4,
  },
  icon: {
    marginRight: 12,
  },
  contactName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFF", // White text for contrast
  },
  contactPhone: {
    fontSize: 14,
    color: "#D5D8DC", // Light grey for subtle details
  },
});

export default HelpDesk;
