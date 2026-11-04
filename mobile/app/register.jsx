import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import api from "../services/api";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password) {
      Alert.alert("Validation", "Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      await api.post("/register", {
        name: name.trim(),
        email: email.trim(),
        password,
      });

      Alert.alert("Success", "Account created successfully", [
        { text: "OK", onPress: () => router.replace("/login") },
      ]);
    } catch (error) {
      Alert.alert(
        "Register Error",
        error.response?.data?.message || error.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

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
        <Button title="Register" onPress={handleRegister} />
      )}

      <Text
        style={styles.login}
        onPress={() => router.replace("/login")}
      >
        Already have an account? Login
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
  login: {
    textAlign: "center",
    marginTop: 20,
    color: "#007AFF",
  },
});
