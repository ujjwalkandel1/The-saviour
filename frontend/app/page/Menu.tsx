import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface MenuButtonProps {
  text: string;
  iconName: keyof typeof FontAwesome.glyphMap; // Enforcing valid FontAwesome icon names
  onPress?: () => void; // Add onPress as an optional prop
}

const MenuButton: React.FC<MenuButtonProps> = ({ text, iconName, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <FontAwesome
        name={iconName}
        size={24}
        color="#34A853"
        style={styles.icon}
      />
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default function MainMenu() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Main Menu</Text>
      <View style={styles.row}>
        <MenuButton text="Instructions" iconName="info-circle" />

        <MenuButton
          text="Register Number"
          iconName="plus-circle"
          onPress={() => {
            router.push("/page/Menu/RegisterNumber"); // Navigate to RegisterNumber screen
          }}
        />
      </View>
      <View style={styles.row}>
        <MenuButton
          text="View Members"
          iconName="eye"
          onPress={() => {
            router.push("/page/Menu/ViewMember"); // Navigate to RegisterNumber screen
          }}
        />
        <MenuButton
          text="Delete Number"
          iconName="trash"
          onPress={() => {
            router.push("/page/Menu/DeleteNumber"); // Navigate to RegisterNumber screen
          }}
        />
      </View>
      <View style={styles.row}>
        <MenuButton
          text="Edit SOS Message"
          iconName="edit"
          onPress={() => {
            router.push("/page/Menu/EditSoSMessage"); // Navigate to RegisterNumber screen
          }}
        />
        <MenuButton
          text="Edit Timer"
          iconName="clock-o"
          onPress={() => {
            router.push("/page/Menu/EditTimer"); // Navigate to RegisterNumber screen
          }}
        />
      </View>
      <View style={styles.row}>
        <MenuButton text="Rate Us" iconName="smile-o" />
        <MenuButton text="Share" iconName="share-alt" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 15,
  },
  button: {
    flex: 1,
    backgroundColor: "#DFF2E3",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    marginHorizontal: 5,
  },
  icon: {
    marginBottom: 5,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
});
