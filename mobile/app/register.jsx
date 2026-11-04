import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet,  Alert, } from "react-native";
import { router } from "expo-router";
import api from "../services/api";

export default function RegisterScreen() {
    const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await api.post("/register", {
        name,
        email,
        password,
      });

      Alert.alert("Success", "Account created successfully");

      router.replace("/");
    } catch (error) {
      Alert.alert(
        "Register Error",
        error.response?.data?.message || "Something went wrong"
      );
    }
  };
    return (
        <View style={styles.container}>
          <Text style={styles.title}>Create Account</Text>

          <TextInput
           style={styles.input}
           placeholder="Name"
          />
        
          <TextInput
           style={styles.input}
           placeholder="Email"
           keyboardType="email-address"
          />

          <TextInput
           style={styles.input}
           placeholder="Password"
           secureTextEntry
          />

          <Button
           title="Register"
           onPress={() => {}}
          />

          <Text
           style={styles.login}
           onPress={() => router.replace("/")}
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
        backgroundColor: "#fff"
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
    },
});