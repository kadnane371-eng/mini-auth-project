import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { router } from "expo-router";
import useAuthStore from "../store/authStore";
export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

      const login = useAuthStore((state) => state.login);

  const handleLogin = async () => {
    try {
      await login(email, password);

      router.replace("/users");
    } catch (error) {
      Alert.alert(
        "Login Error",
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome Back</Text>

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

            <Button title="Login" onPress={() => {}}/>

                <Text style={styles.register}
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
    },
});