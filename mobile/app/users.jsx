import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import api from "../services/api";
import useAuthStore from "../store/authStore";

export default function UsersScreen() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);

  const getUsers = async () => {
    try {
      setLoading(true);
      const activeToken = token || (await SecureStore.getItemAsync("token"));

      if (!activeToken) {
        router.replace("/login");
        return;
      }

      const response = await api.get("/users", {
        headers: {
          Authorization: `Bearer ${activeToken}`,
        },
      });

      // Backend returns { users: [...] }
      const userList = response.data?.users || response.data || [];
      setUsers(Array.isArray(userList) ? userList : []);
    } catch (error) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Cannot get users"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Users List</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" style={{ flex: 1 }} />
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
          renderItem={({ item }) => (
            <View style={styles.user}>
              <Text style={styles.name}>Name: {item.name}</Text>
              <Text style={styles.email}>Email: {item.email}</Text>
              {item.role && <Text style={styles.role}>Role: {item.role}</Text>}
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No users found</Text>
          }
        />
      )}

      <View style={styles.footer}>
        <Button title="Logout" onPress={handleLogout} color="#d9534f" />
      </View>
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
    backgroundColor: "#f9f9f9",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  email: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  role: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
    textTransform: "uppercase",
  },
  emptyText: {
    textAlign: "center",
    color: "#888",
    marginTop: 20,
    fontSize: 16,
  },
  footer: {
    marginTop: 15,
  },
});
