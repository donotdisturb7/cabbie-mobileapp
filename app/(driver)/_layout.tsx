import { Tabs } from 'expo-router';
import React from 'react';
import TabBar from '@/components/TabBar';
import { useAuth } from '@/context/AuthContext';
import { COLORS } from '@/constants/theme';

export default function DriverLayout() {
  const { user } = useAuth();

  // Protection de la route
  if (user?.role !== 'DRIVER') {
    return null;
  }

  return (
    <Tabs
      tabBar={props => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Accueil',
        }}
      />
      <Tabs.Screen
        name="rides"
        options={{
          title: 'Courses',
        }}
      />
      <Tabs.Screen
        name="earnings"
        options={{
          title: 'Gains',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
        }}
      />
    </Tabs>
  );
}
