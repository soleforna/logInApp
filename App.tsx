import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button} from "react-native";
import { AuthProvider, useAuth } from "./src/context/AuthContext";
import Home from "./src/screens/Home";
import Login from "./src/screens/Login";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // Wrap the entire app with the AuthProvider context to make authentication state accessible
    <AuthProvider>
      <Layout></Layout>
    </AuthProvider>
  );
}

export const Layout = () => {
   // Use the useAuth hook to access the authentication state and logout function
  const { authState, onLogout } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator>
     
        {authState?.authenticated ? (
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerRight: () => <Button onPress={onLogout} title="Sign Out" />,
            }}
          ></Stack.Screen>
        ) : (
          <Stack.Screen name="Login" component={Login}></Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
