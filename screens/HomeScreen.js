import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { Auth } from '@aws-amplify/auth';

export default function HomeScreen({ navigation, setIsAuthenticated }) {
    const [hasPermission, setHasPermission] = useState(null); // Camera permission state
    const [cameraRef, setCameraRef] = useState(null); // Camera reference
    const [photoUri, setPhotoUri] = useState(null); // Captured photo URI

    const signOut = async () => {
        try {
            await Auth.signOut();
            // Set isAuthenticated to false to trigger navigation to Login
            setIsAuthenticated(false);
            navigation.replace('Login'); // Navigate to Login
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                await Auth.currentAuthenticatedUser();
                // User is authenticated, do nothing
            } catch (error) {
                console.log('User is not authenticated, redirecting to Login.');
                setIsAuthenticated(false);
                navigation.replace('Login'); // Redirect to Login if not authenticated
            }
        };
        checkAuthStatus();
    }, [navigation, setIsAuthenticated]);

    useEffect(() => {
        console.log('Checking camera permissions...'); // Log when useEffect runs

        (async () => {
            try {
                const { status } = await Camera.requestCameraPermissionsAsync();
                console.log('Camera Permission Status:', status); // Log the permission status

                if (status === 'granted') {
                    console.log('Camera permission granted!');
                } else {
                    console.log('Camera permission denied.');
                }

                setHasPermission(status === 'granted');
            } catch (error) {
                console.error('Error requesting camera permission:', error);
            }
        })();
    }, []);

    const takePicture = async () => {
        if (cameraRef) {
            console.log('Taking picture...');
            const photo = await cameraRef.takePictureAsync();
            console.log('Photo URI:', photo.uri);
            setPhotoUri(photo.uri);
        }
    };

    if (hasPermission === null) {
        return <Text>Requesting camera permission...</Text>;
    }

    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <Text>Welcome to the Home Screen!</Text>
            <Button title="Sign Out" onPress={signOut} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
