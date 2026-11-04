
import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  Alert,
} from "react-native";
import { router } from "expo-router";
import api from "../services/api";
import useAuthStore from "../store/authStore";

export default function UsersScreen() {
  const [users, setUsers] = useState([]);

  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);

  const getUsers = async () => {
    try {
      const response = await api.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(response.data);
    } catch (error) {
      Alert.alert("Error", "Cannot get users");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleLogout = async () => {
    await logout();
    router.replace("/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Users List</Text>

      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.user}>
            <Text>Name: {item.name}</Text>
            <Text>Email: {item.email}</Text>
          </View>
        )}
      />

      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    paddingTop: 60,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
  },
  user: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
  },
});
