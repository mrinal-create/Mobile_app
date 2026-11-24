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

export default function AllUsers({ navigation }) {
  const [search, setSearch] = useState('');

  // Safe filter on users list by name
  const filteredUsers = (users || []).filter((user) =>
    (user?.name || '').toLowerCase().includes((search || '').toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      {/* Search Bar */}
      <View style={styles.searchBox}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search users..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Users List */}
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.userCard}
            onPress={() => navigation.navigate('Chat', { user: item, data: item })}
          >
            {/* User Profile Image */}
            <Image
              source={{ uri: item.image || item.profileImage }}
              style={styles.avatar}
            />

            {/* User Name & Status */}
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.status}>
                {item.online ? '🟢 Online' : '⚪ Offline'}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No users found</Text>
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
  searchBox: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  searchInput: {
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    fontSize: 15,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 14,
    backgroundColor: '#E1E4E8',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 2,
  },
  status: {
    fontSize: 13,
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
