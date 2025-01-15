import { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, ImageBackground } from 'react-native';
import { router } from 'expo-router';
import { COLORS } from '@/constants/theme';

export default function LaunchScreen() {
  const loadingAnim = new Animated.Value(0);
// animation de la bar de chargement & redirection vers la page welcome
  useEffect(() => {

    Animated.timing(loadingAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start(() => {
      
      router.replace('/welcome');
    });
  }, []);

  const width = loadingAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <ImageBackground 
      source={require('@/assets/images/loading-black.png')} 
      style={styles.container}
    >

      
      <View style={styles.loadingContainer}>
        <Animated.View 
          style={[
            styles.loadingBar,
            {
              width,
            },
          ]} 
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.secondary,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.secondary,
    marginBottom: 50,
    opacity: 0.8,
  },
  loadingContainer: {
    width: '80%',
    height: 6,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 3,
    overflow: 'hidden',
    marginTop: 250, 
  },
  loadingBar: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: COLORS.secondary,
  },
});
