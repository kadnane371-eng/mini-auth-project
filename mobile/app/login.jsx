import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import useAuthStore from "../store/authStore";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = useAuthStore((state) => state.login);

  const handleLogin = async () => {
    if (!email.trim() || !password) {
      Alert.alert("Validation", "Please enter both email and password");
      return;
    }

    try {
      setLoading(true);
      await login(email.trim(), password);
      router.replace("/users");
    } catch (error) {
      Alert.alert(
        "Login Error",
        error.response?.data?.message || error.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <Button title="Login" onPress={handleLogin} />
      )}

      <Text
        style={styles.register}
        onPress={() => router.push("/register")}
      >
        Don't have an account? Register
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 14,
    borderRadius: 8,
    marginBottom: 15,
  },
  register: {
    textAlign: "center",
    marginTop: 20,
    color: "#007AFF",
  },
});
