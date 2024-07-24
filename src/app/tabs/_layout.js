import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#593C9D",
        tabBarInactiveTintColor: "#593C9D99",
        tabBarStyle: styles.tabBarStyle,
        tabBarIcon: ({ focused, color }) => {
          const iconSize = 30; // Definindo um tamanho fixo para todos os ícones
          if (route.name === "home") {
            return <Ionicons name={focused ? "home" : "home-outline"} color={color} size={iconSize} />;
          } else if (route.name === "calendario") {
            return <Ionicons name={focused ? "calendar" : "calendar-outline"} color={color} size={iconSize} />;
          } else if (route.name === "adote") {
            return <Ionicons name={focused ? "paw" : "paw-outline"} color={color} size={iconSize} />;
          } else if (route.name === "perfil") {
            return <Ionicons name={focused ? "person" : "person-outline"} color={color} size={iconSize} />;
          }
        },
        tabBarIconStyle: { marginBottom: -10 },
      })}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          headerShadowVisible: false,
          headerTitleStyle: { fontSize: 24, fontWeight: "bold" },
          headerTitleContainerStyle: { marginTop: 20, marginLeft: 30 },
        }}
      />
      <Tabs.Screen
        name="calendario"
        options={{
          title: "Calendário",
          headerShown: false,
          headerShadowVisible: false,
          headerTitleStyle: { fontSize: 24, fontWeight: "bold" },
          headerTitleContainerStyle: { marginTop: 20, marginLeft: 30 },
        }}
      />
      <Tabs.Screen
        name="adote"
        options={{
          title: "Adote",
          headerTitleStyle: { fontSize: 24, fontWeight: "bold" },
          headerTitleContainerStyle: { marginTop: 20, marginLeft: 30 },
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
          headerShown: false,
          headerShadowVisible: false,
          headerTitleStyle: { fontSize: 24, fontWeight: "bold" },
          headerTitleContainerStyle: { marginTop: 20, marginLeft: 30 },
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: "white",
    height: 60,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
});
