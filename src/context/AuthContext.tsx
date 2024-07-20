import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';



// Define the structure of the authentication context
interface AuthProps {
    authState?: {
        token: String | null; 
        authenticated: boolean | null;
    };
    onRegister?: (email: string, password: string) => Promise<any>;
    onLogin?: (email: string, password: string) => Promise<any>;
    onLogout?: () => Promise<any>;
}

// Constants for secure token storage and API URL
const TOKEN_KEY = 'token';

//REemlacé local storage por el IP de mi PC para que me funcione desde el celu
export const API_URL = 'http://192.168.1.46:8080/api/v1';


// Create a context for authentication
const AuthContext = createContext<AuthProps>({});

// Custom hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};

// Function to store item
const storeItem = async (token: string, value: string) => {
    await AsyncStorage.setItem(token, value);
  };
  
  // Function to get item
  const getItem = async (token: string) => {
    const item = await AsyncStorage.getItem(token);
    return item;
  };
  
  // Function to delete item
  const deleteItem = async (token: string) => {
    await AsyncStorage.removeItem(token);
  };


// AuthProvider component to wrap around the app
export const AuthProvider = ({ children }: any) => {

    // State to hold the authentication state
    const [authState, setAuthState] = useState<{
        token: string | null;
        authenticated: boolean | null;
    }>({
        token: null,
        authenticated: null
    });

    // Load token from secure storage when the component mounts
    useEffect(() => {
        const loadToken = async () => {
            const token = await getItem(TOKEN_KEY);
            if (token) {
                setAuthState({
                    token: token,
                    authenticated: true
                });
            }
        };
        loadToken();
    }, []);

    // Function to handle user registration
    const register = async (email: string, password: string) => {
        try {
            const response = await fetch(`${API_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return await response.json();
        } catch (e: unknown) {
            const error = e as Error;
            console.error('Error during register:', error.message);
            return { error: true, message: error.message };
        }
    };

     // Function to handle user login
    const login = async (email: string, password: string) => {
        try {
            const response = await fetch(`${API_URL}/auth/signIn`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Language':'es'
                },
                body: JSON.stringify({ email, password })
            });
            console.log(response)
        
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log("LOGIN RESULT 😁", result);

            setAuthState({
                token: result.token,
                authenticated: true
            });

            await storeItem(TOKEN_KEY, result.token);
            return result;
        } catch (e: unknown) {
            const error = e as Error;
            console.error('Error during login:', error.message);
            return { error: true, msg: error.message };
        }
    };

     // Function to handle user logout
    const logout = async () => {
        // Delete token from storage
        await deleteItem(TOKEN_KEY);

        // Reset auth state
        setAuthState({
            token: null,
            authenticated: false
        });
    };

    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        authState
    };

     // Provide the authentication context to children components
    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
