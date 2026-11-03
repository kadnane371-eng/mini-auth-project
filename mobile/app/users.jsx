import { View, Text, Button, StyleSheet   } from "react-native";
import { router } from "expo-router";

export default function UsersScreen() {
    return (
        <View style={styles.container}>
         <Text style={styles.title}>Users List</Text>
         
         <Text>No users yet</Text>

         <Button
         title="Logout"
         onPress={() => router.replace("/")}
         />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 25,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 20,
    },
});