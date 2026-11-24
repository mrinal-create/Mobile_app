import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

// Reusable ChatBubble component
// Displays text and images with simple conditional styling
export default function ChatBubble({ message }) {
  // Check if message was sent by current user
  const isMe = message.sender === 'me';
  const hasImage = Boolean(message.image);

  return (
    <View style={[styles.bubbleContainer, isMe ? styles.myContainer : styles.otherContainer]}>
      <View style={[styles.bubble, isMe ? styles.myBubble : styles.otherBubble]}>
        {/* If message has an image, display it */}
        {hasImage && (
          <Image
            source={{ uri: message.image }}
            style={styles.bubbleImage}
            resizeMode="cover"
          />
        )}

        {/* If message has text, display it */}
        {message.text ? (
          <Text style={[styles.messageText, isMe ? styles.myText : styles.otherText]}>
            {message.text}
          </Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bubbleContainer: {
    marginVertical: 4,
    paddingHorizontal: 12,
    flexDirection: 'row',
  },
  myContainer: {
    justifyContent: 'flex-end', // Sent messages on the right
  },
  otherContainer: {
    justifyContent: 'flex-start', // Received messages on the left
  },
  bubble: {
    maxWidth: '75%',
    padding: 10,
    borderRadius: 16,
  },
  myBubble: {
    backgroundColor: '#007AFF', // Blue bubble
    borderBottomRightRadius: 2,
  },
  otherBubble: {
    backgroundColor: '#E5E5EA', // Light gray bubble
    borderBottomLeftRadius: 2,
  },
  bubbleImage: {
    width: 200,
    height: 150,
    borderRadius: 12,
    marginBottom: 4,
    backgroundColor: '#CCCCCC',
  },
  messageText: {
    fontSize: 15,
  },
  myText: {
    color: '#FFFFFF', // White text on blue
  },
  otherText: {
    color: '#000000', // Black text on gray
  },
});
