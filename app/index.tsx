import { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { router } from 'expo-router';
import { COLORS } from '@/constants/theme';
import LottieView from 'lottie-react-native';

export default function LaunchScreen() {
  const loadingAnim = new Animated.Value(0);

  // animation de la bar de chargement & redirection vers la page welcome
  useEffect(() => {
    Animated.timing(loadingAnim, {
      toValue: 1,
      duration: 3500,
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
    <View style= { styles.container } >
      <LottieView
        source={require('../assets/images/Animation - loading.json')}
        autoPlay
        loop
        style={styles.lottie}
      />
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#001D3D', // Vous pouvez ajuster la couleur de fond selon vos besoins
  },
  lottie: {
    width: 200,
    height: 200,
  },
  // bar de chargement loading  
  /*
  loadingContainer: {
    width: '80%',
    height: 6,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 3,
    overflow: 'hidden',
    marginTop: 20,
  },
  loadingBar: {
    height: '100%',
    borderRadius: 3,
    backgroundColor: COLORS.secondary,
  },*/
});