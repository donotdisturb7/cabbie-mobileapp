import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { router } from 'expo-router';
import { COLORS } from '@/constants/theme';

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('@/assets/images/cabBGLogo.png')}
        style={styles.backgroundImage}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Bienvenue sur Cabbie</Text>
            <Text style={styles.subtitle}>
              Votre mobilité, réinventée !
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push('/(auth)/sign-in?role=PASSENGER')}
            >
              <Text style={styles.buttonText}>Je suis un passager</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.buttonOutline]}
              onPress={() => router.push('/(auth)/sign-in?role=DRIVER')}
            >
              <Text style={[styles.buttonText, styles.buttonTextOutline]}>
                Je suis un chauffeur
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001D3D',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  header: {
    marginTop: 100,
    alignItems: 'center',
  },
  title: {
    fontSize: 29,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 20,
    color: '#FFD700', 
    textAlign: 'center',
    marginBottom: 32,
  },
  buttonContainer: {
    width: '100%',
    paddingBottom: 50,
    gap: 16,
  },
  button: {
    backgroundColor: '#FFD700', 
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonTextOutline: {
    color: '#FFF',
  },
});
