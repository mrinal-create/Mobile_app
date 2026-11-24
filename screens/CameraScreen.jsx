import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ExpoImagePicker from 'expo-image-picker';

export default function CameraScreen({ navigation }) {
  const [photoUri, setPhotoUri] = useState(null);

  // 1. Take a photo with device camera
  const handleTakePhoto = async () => {
    try {
      const permission = await ExpoImagePicker.requestCameraPermissionsAsync();

      if (!permission.granted) {
        Alert.alert('Permission needed', 'Please allow camera access to take photos.');
        return;
      }

      const result = await ExpoImagePicker.launchCameraAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.7,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setPhotoUri(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Camera Error', 'Could not open camera.');
    }
  };

  // 2. Send photo back to chat screen
  const handleSendPhoto = () => {
    if (!photoUri) return;
    navigation.navigate('Chat', { photo: photoUri });
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      {photoUri ? (
        // Preview Mode
        <View style={styles.previewContainer}>
          <Image source={{ uri: photoUri }} style={styles.previewImage} resizeMode="contain" />
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.secondaryButton} onPress={() => setPhotoUri(null)}>
              <Text style={styles.secondaryButtonText}>🔄 Retake</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.primaryButton} onPress={handleSendPhoto}>
              <Text style={styles.primaryButtonText}>✓ Send to Chat</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        // Initial Action Mode
        <View style={styles.centerContainer}>
          <Text style={styles.cameraIcon}>📷</Text>
          <Text style={styles.title}>Camera Screen</Text>
          <Text style={styles.subtitle}>Take a photo using native camera UI.</Text>

          <TouchableOpacity style={styles.primaryButton} onPress={handleTakePhoto}>
            <Text style={styles.primaryButtonText}>Open Camera</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cameraIcon: {
    fontSize: 60,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 24,
    textAlign: 'center',
  },
  previewContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  previewImage: {
    flex: 1,
    borderRadius: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    gap: 12,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#3A3A3C',
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 15,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 24,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
