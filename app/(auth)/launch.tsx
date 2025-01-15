import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { BlurView } from 'expo-blur';
import { COLORS } from '@/constants/theme';

export default function LaunchScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={require('../../assets/images/image.png')}
        style={styles.backgroundImage}
      />
      <BlurView intensity={20} style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>Cabbie</Text>
          <Text style={styles.subtitle}>Trouver votre taxi près de chez vous !</Text>
          
          <View style={styles.buttonContainer}>
            <Link href="/sign-in" asChild>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Continuer</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,29,61,0.4)', 
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
    paddingBottom: 50,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.white,
    marginBottom: 40,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.secondary,
  },
});
