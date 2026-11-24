import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { users } from '../data/dummyData';

export default function ConversationScreen({ navigation }) {
  const [search, setSearch] = useState('');

  // Safe filter on conversation list
  const filteredUsers = (users || []).filter((user) =>
    (user?.name || '').toLowerCase().includes((search || '').toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      {/* Search Bar & New Chat Button */}
      <View style={styles.topBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search chats..."
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity
          style={styles.allUsersButton}
          onPress={() => navigation.navigate('AllUsers')}
        >
          <Text style={styles.allUsersButtonText}>+ New</Text>
        </TouchableOpacity>
      </View>

      {/* Conversations List */}
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Chat', { user: item, data: item })}
          >
            {/* User Profile Image */}
            <Image
              source={{ uri: item.image || item.profileImage }}
              style={styles.avatar}
            />

            {/* Conversation Details */}
            <View style={styles.details}>
              <View style={styles.row}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.time}>{item.time}</Text>
              </View>
              <Text style={styles.lastMessage} numberOfLines={1}>
                {item.lastMessage}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No conversations found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topBar: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    fontSize: 15,
  },
  allUsersButton: {
    marginLeft: 10,
    backgroundColor: '#007AFF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  allUsersButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    backgroundColor: '#E1E4E8',
  },
  details: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1C1C1E',
  },
  time: {
    fontSize: 12,
    color: '#8E8E93',
  },
  lastMessage: {
    fontSize: 14,
    color: '#8E8E93',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    color: '#8E8E93',
    fontSize: 15,
  },
});
