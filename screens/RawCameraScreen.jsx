import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function RawCameraScreen({ navigation }) {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [photoUri, setPhotoUri] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const cameraRef = useRef(null);

  // 1. Permission loading state
  if (!permission) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  // 2. Permission request screen
  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <Text style={styles.icon}>📷</Text>
        <Text style={styles.title}>Camera Access Required</Text>
        <Text style={styles.subtitle}>Please grant permission to use the custom camera viewfinder.</Text>
        <TouchableOpacity style={styles.primaryButton} onPress={requestPermission}>
          <Text style={styles.primaryButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // 3. Take picture with CameraView ref
  const takePicture = async () => {
    if (!cameraRef.current || isCapturing) return;

    try {
      setIsCapturing(true);
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.7,
      });
      setIsCapturing(false);

      if (photo?.uri) {
        setPhotoUri(photo.uri);
      }
    } catch (error) {
      setIsCapturing(false);
      Alert.alert('Error', 'Failed to take photo.');
    }
  };

  const toggleFacing = () => {
    setFacing((prev) => (prev === 'back' ? 'front' : 'back'));
  };

  const handleSendPhoto = () => {
    if (!photoUri) return;
    navigation.navigate('Chat', { photo: photoUri });
  };

  // 4. Photo Preview Mode
  if (photoUri) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
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
      </SafeAreaView>
    );
  }

  // 5. Live Camera Viewfinder Mode
  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
        {/* Top Controls Overlay */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.controlButton} onPress={toggleFacing}>
            <Text style={styles.controlText}>🔄 Flip</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Shutter Overlay */}
        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={styles.shutterButton}
            onPress={takePicture}
            disabled={isCapturing}
          >
            {isCapturing ? (
              <ActivityIndicator color="#007AFF" />
            ) : (
              <View style={styles.shutterInner} />
            )}
          </TouchableOpacity>
        </View>
      </CameraView>
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
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  icon: {
    fontSize: 50,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    marginBottom: 24,
  },
  camera: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topBar: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  controlButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  controlText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  bottomBar: {
    paddingBottom: 30,
    alignItems: 'center',
  },
  shutterButton: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  shutterInner: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#000000',
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
