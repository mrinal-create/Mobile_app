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

export default function ImagePickerScreen({ navigation }) {
  const [imageUri, setImageUri] = useState(null);

  // 1. Pick an image from device gallery
  const handlePickImage = async () => {
    try {
      const permission = await ExpoImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert('Permission needed', 'Please allow photo library access to select pictures.');
        return;
      }

      const result = await ExpoImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.7,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Gallery Error', 'Could not open image library.');
    }
  };

  // 2. Send image back to chat
  const handleSendImage = () => {
    if (!imageUri) return;
    navigation.navigate('Chat', { photo: imageUri });
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      {imageUri ? (
        // Preview Mode
        <View style={styles.previewContainer}>
          <Image source={{ uri: imageUri }} style={styles.previewImage} resizeMode="contain" />
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.secondaryButton} onPress={handlePickImage}>
              <Text style={styles.secondaryButtonText}>Choose Another</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.primaryButton} onPress={handleSendImage}>
              <Text style={styles.primaryButtonText}>✓ Send to Chat</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        // Initial Action Mode
        <View style={styles.centerContainer}>
          <Text style={styles.galleryIcon}>🖼️</Text>
          <Text style={styles.title}>Gallery Image Picker</Text>
          <Text style={styles.subtitle}>Select a photo from your device gallery to share in chat.</Text>

          <TouchableOpacity style={styles.primaryButton} onPress={handlePickImage}>
            <Text style={styles.primaryButtonText}>Open Photo Library</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  galleryIcon: {
    fontSize: 60,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1C1C1E',
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
    backgroundColor: '#E5E5EA',
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#1C1C1E',
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
