import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, View } from 'react-native';
import { Auth } from '@aws-amplify/auth';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createStackNavigator();

export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(null); // Track authentication state

    useEffect(() => {
        // Check if the user is authenticated when the app loads
        const checkAuthStatus = async () => {
            try {
                const user = await Auth.currentAuthenticatedUser();
                setIsAuthenticated(true);  // User is authenticated
            } catch (error) {
                setIsAuthenticated(false); // User is not authenticated
            }
        };

        checkAuthStatus();
    }, []);

    // Display a loading spinner while checking authentication state
    if (isAuthenticated === null) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {/* Always define both screens */}
                <Stack.Screen
                    name="Login"
                    options={{ headerShown: false }}
                >
                    {(props) => <LoginScreen {...props} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />}
                </Stack.Screen>

                <Stack.Screen
                    name="Home"
                    options={{ headerShown: false }}
                >
                    {(props) => <HomeScreen {...props} setIsAuthenticated={setIsAuthenticated} />}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
