import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { COLORS } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace('/welcome');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const menuItems = [
    {
      icon: 'user-circle',
      title: 'Informations personnelles',
      onPress: () => {},
    },
    {
      icon: 'history',
      title: 'Historique des courses',
      onPress: () => {},
    },
    {
      icon: 'credit-card',
      title: 'Moyens de paiement',
      onPress: () => {},
    },
    {
      icon: 'bell',
      title: 'Notifications',
      onPress: () => {},
    },
    {
      icon: 'cog',
      title: 'Paramètres',
      onPress: () => {},
    },
    {
      icon: 'question-circle',
      title: 'Aide & Support',
      onPress: () => {},
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <FontAwesome5 name="user-circle" size={80} color={COLORS.primary} />
        </View>
        <Text style={styles.name}>{user?.email}</Text>
        <Text style={styles.role}>
          {user?.role === 'DRIVER' ? 'Chauffeur' : 'Passager'}
        </Text>
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={item.onPress}>
            <View style={styles.menuItemContent}>
              <FontAwesome5
                name={item.icon}
                size={20}
                color={COLORS.secondary}
                style={styles.menuIcon}
              />
              <Text style={styles.menuText}>{item.title}</Text>
            </View>
            <FontAwesome5
              name="chevron-right"
              size={16}
              color={COLORS.gray}
            />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.signOutButton}
        onPress={handleSignOut}>
        <FontAwesome5
          name="sign-out-alt"
          size={20}
          color={COLORS.error}
          style={styles.menuIcon}
        />
        <Text style={styles.signOutText}>Se déconnecter</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.secondary,
    marginBottom: 5,
  },
  role: {
    fontSize: 16,
    color: COLORS.gray,
  },
  menuContainer: {
    backgroundColor: COLORS.white,
    marginTop: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.lightGray,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    justifyContent: 'space-between',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    width: 30,
  },
  menuText: {
    fontSize: 16,
    color: COLORS.secondary,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    marginTop: 20,
    padding: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.lightGray,
  },
  signOutText: {
    fontSize: 16,
    color: COLORS.error,
    fontWeight: '500',
  },
});
