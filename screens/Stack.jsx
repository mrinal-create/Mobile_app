import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ConversationScreen from './ConversationScreen';
import AllUsers from './AllUsers';
import ChatScreen from './ChatScreen';
import CameraScreen from './CameraScreen';
import ImagePickerScreen from './ImagePicker';
import RawCameraScreen from './RawCameraScreen';

const Stack = createNativeStackNavigator();

export default function StackNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="ConversationScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FFFFFF',
        },
        headerTintColor: '#007AFF',
        headerTitleStyle: {
          fontWeight: 'bold',
          color: '#1C1C1E',
        },
      }}
    >
      <Stack.Screen
        name="ConversationScreen"
        component={ConversationScreen}
        options={{ title: 'Chats' }}
      />
      <Stack.Screen
        name="ConversationsScreen"
        component={ConversationScreen}
        options={{ title: 'Chats' }}
      />
      <Stack.Screen
        name="Conversation"
        component={ConversationScreen}
        options={{ title: 'Chats' }}
      />
      <Stack.Screen
        name="Conversations"
        component={ConversationScreen}
        options={{ title: 'Chats' }}
      />
      <Stack.Screen
        name="AllUsers"
        component={AllUsers}
        options={{ title: 'All Contacts' }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={({ route }) => ({
          title: route.params?.user?.name || route.params?.data?.name || 'Chat',
        })}
      />
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={({ route }) => ({
          title: route.params?.user?.name || route.params?.data?.name || 'Chat',
        })}
      />
      <Stack.Screen
        name="CameraScreen"
        component={CameraScreen}
        options={{
          title: 'Camera',
          headerStyle: { backgroundColor: '#000000' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { color: '#FFFFFF' },
        }}
      />
      <Stack.Screen
        name="ImagePicker"
        component={ImagePickerScreen}
        options={{ title: 'Select Photo' }}
      />
      <Stack.Screen
        name="ImagePickerScreen"
        component={ImagePickerScreen}
        options={{ title: 'Select Photo' }}
      />
      <Stack.Screen
        name="RawCameraScreen"
        component={RawCameraScreen}
        options={{
          title: 'Live Camera',
          headerStyle: { backgroundColor: '#000000' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { color: '#FFFFFF' },
        }}
      />
    </Stack.Navigator>
  );
}
