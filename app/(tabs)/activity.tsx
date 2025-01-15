import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';

const mockRides = [
  {
    id: '1',
    date: 'Aujourd\'hui, 14h30',
    from: 'Fort-de-France, Rue de la République',
    to: 'Les Trois-Îlets, Rue de la Plage',
    price: '25,50 €',
    status: 'terminé',
  },
  {
    id: '2',
    date: 'Hier, 11h20',
    from: 'Le Lamentin, Avenue des Arawaks',
    to: 'Sainte-Anne, Rue des Alizés',
    price: '18,75 €',
    status: 'terminé',
  },
];

export default function ActivityScreen() {
  const renderRideItem = ({ item }) => (
    <View style={styles.rideItem}>
      <View style={styles.rideHeader}>
        <Text style={styles.rideDate}>{item.date}</Text>
        <Text style={styles.ridePrice}>{item.price}</Text>
      </View>
      
      <View style={styles.rideRoute}>
        <View style={styles.routePoint}>
          <FontAwesome name="circle" size={12} color="#4CAF50" />
          <Text style={styles.routeText}>{item.from}</Text>
        </View>
        <View style={styles.routeLine} />
        <View style={styles.routePoint}>
          <FontAwesome name="circle" size={12} color="#F44336" />
          <Text style={styles.routeText}>{item.to}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Mes trajets</Text>
      <FlatList
        data={mockRides}
        renderItem={renderRideItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    padding: 20,
  },
  listContent: {
    padding: 20,
  },
  rideItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  rideHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  rideDate: {
    fontSize: 16,
    color: '#757575',
  },
  ridePrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  rideRoute: {
    gap: 10,
  },
  routePoint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  routeLine: {
    width: 2,
    height: 20,
    backgroundColor: '#E0E0E0',
    marginLeft: 5,
  },
  routeText: {
    fontSize: 16,
  },
});
