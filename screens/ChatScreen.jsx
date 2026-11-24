import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ChatBubble from '../components/ChatBubble';
import { initialMessages } from '../data/dummyData';

// WebSocket Server URL (change IP if running on physical device, e.g. ws://192.168.1.X:8080)
const WS_URL = 'ws://localhost:8080';

export default function ChatScreen({ navigation, route }) {
  const { user } = route.params || { user: { name: 'Rahul Sharma' } };

  const [messages, setMessages] = useState(initialMessages);
  const [inputText, setInputText] = useState('');

  const flatListRef = useRef(null);
  const wsRef = useRef(null);

  // 1. Setup WebSocket connection
  useEffect(() => {
    let ws = null;
    try {
      ws = new WebSocket(WS_URL);
      wsRef.current = ws;

      ws.onmessage = (event) => {
        try {
          const incoming = JSON.parse(event.data);
          if (incoming) {
            setMessages((prev) => [
              ...prev,
              { ...incoming, id: String(Date.now()), sender: 'other' },
            ]);
          }
        } catch (e) {
          console.log('Error parsing WebSocket message:', e);
        }
      };

      ws.onerror = (error) => {
        console.log('WebSocket error (offline mode):', error.message || error);
      };
    } catch (e) {
      console.log('Failed to initialize WebSocket:', e);
    }

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  // 2. Receive photo returned from CameraScreen, ImagePicker, or RawCameraScreen
  useEffect(() => {
    if (route.params?.photo) {
      sendMessage({
        id: String(Date.now()),
        text: '',
        image: route.params.photo,
        sender: 'me',
      });
      // Clear route param to prevent duplicate sends
      navigation.setParams({ photo: null });
    }
  }, [route.params?.photo]);

  // 3. Send Text Message
  const handleSendText = () => {
    if (!inputText.trim()) return;

    const messageData = {
      id: String(Date.now()),
      text: inputText.trim(),
      image: null,
      sender: 'me',
    };

    sendMessage(messageData);
    setInputText('');
  };

  // 4. Common helper to send message
  const sendMessage = (newMsg) => {
    // Add to local message list immediately
    setMessages((prev) => [...prev, newMsg]);

    // Send over WebSocket if connected
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(newMsg));
    } else {
      // Offline fallback: simulated auto-reply after 1 second
      setTimeout(() => {
        const autoReply = {
          id: String(Date.now() + 1),
          text: newMsg.image ? 'Nice photo! 📸 Received.' : `Got it: "${newMsg.text}" 👍`,
          image: null,
          sender: 'other',
        };
        setMessages((prev) => [...prev, autoReply]);
      }, 1000);
    }

    // Scroll to latest message
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        {/* Messages List */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ChatBubble message={item} />}
          contentContainerStyle={styles.listContent}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />

        {/* Message Input Box with Camera, ImagePicker & RawCamera Buttons */}
        <View style={styles.inputContainer}>
          {/* Gallery ImagePicker Screen Button */}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('ImagePicker')}
          >
            <Text style={styles.actionIcon}>🖼️</Text>
          </TouchableOpacity>

          {/* Standard Camera Screen Button */}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('CameraScreen')}
          >
            <Text style={styles.actionIcon}>📷</Text>
          </TouchableOpacity>

          {/* Live Viewfinder RawCameraScreen Button */}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('RawCameraScreen')}
          >
            <Text style={styles.actionIcon}>📹</Text>
          </TouchableOpacity>

          {/* Text Input Field */}
          <TextInput
            style={styles.input}
            placeholder={`Message ${user?.name || ''}...`}
            value={inputText}
            onChangeText={setInputText}
          />

          {/* Send Button */}
          <TouchableOpacity style={styles.sendButton} onPress={handleSendText}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardView: {
    flex: 1,
  },
  listContent: {
    paddingVertical: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  actionIcon: {
    fontSize: 18,
  },
  input: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    fontSize: 15,
    marginRight: 6,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
