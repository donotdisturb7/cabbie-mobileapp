import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';

// Coordonnées pour la Martinique
const MARTINIQUE_REGION = {
  latitude: 14.6415,
  longitude: -61.0242,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const EXAMPLE_TAXIS = [
  { id: 1, latitude: 14.6415, longitude: -61.0242, status: 'available' },
  { id: 2, latitude: 14.6515, longitude: -61.0342, status: 'busy' },
  { id: 3, latitude: 14.6315, longitude: -61.0142, status: 'available' },
];

export default function HomeScreen() {
  const { user } = useAuth();
  const [selectedTaxi, setSelectedTaxi] = useState(null);
  const [destination, setDestination] = useState(null);

  const handleBookTaxi = () => {
    // TODO: Implement taxi booking
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              // handle menu
            }}
            style={[styles.btn, styles.btnIcon]}>
            <Feather name="menu" size={19} color="#000" />
          </TouchableOpacity>

          <View style={styles.headerActions}>
            <TouchableOpacity
              onPress={() => {
                // handle search location
              }}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Rechercher</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                // handle current location
              }}
              style={[styles.btn, styles.btnIcon]}>
              <Feather
                name="navigation"
                size={19}
                color="#000"
              />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      <MapView
        style={styles.map}
        initialRegion={MARTINIQUE_REGION}>
        {/* Position actuelle */}
        <Marker coordinate={MARTINIQUE_REGION}>
          <View style={[styles.marker, styles.currentMarker]}>
            <FontAwesome5 name="user" size={15} color="#fff" />
          </View>
        </Marker>

        {/* Taxis disponibles */}
        {EXAMPLE_TAXIS.map((taxi) => (
          <Marker
            key={taxi.id}
            coordinate={{
              latitude: taxi.latitude,
              longitude: taxi.longitude,
            }}
            onPress={() => setSelectedTaxi(taxi)}>
            <View style={[
              styles.marker,
              { backgroundColor: taxi.status === 'available' ? COLORS.primary : COLORS.gray }
            ]}>
              <FontAwesome5 name="taxi" size={15} color="#fff" />
            </View>
          </Marker>
        ))}

        {/* Trajet si destination sélectionnée */}
        {destination && (
          <Polyline
            coordinates={[MARTINIQUE_REGION, destination]}
            strokeColor={COLORS.primary}
            strokeWidth={3}
          />
        )}
      </MapView>

      {/* Bottom Sheet */}
      <SafeAreaView style={styles.sheet}>
        <View style={styles.sheetHeader}>
          <Text style={styles.sheetTitle}>
            {selectedTaxi ? 'Taxi disponible' : 'Rechercher un taxi'}
          </Text>

          <Text style={styles.sheetSubtitle}>
            {selectedTaxi 
              ? 'À 3 minutes de vous'
              : 'Sélectionnez votre destination'}
          </Text>
        </View>

        {selectedTaxi ? (
          <>
            <View style={styles.sheetSection}>
              <View style={{ marginRight: 'auto' }}>
                <Text style={styles.sectionTitle}>Chauffeur</Text>
                <Text style={styles.sectionSubtitle}>Jean D.</Text>
              </View>

              <TouchableOpacity style={styles.btnSm}>
                <Text style={styles.btnSmText}>4.8 ★</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.btnSm}>
                <Feather name="phone" size={19} color="#000" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.btnSm}>
                <Feather name="message-square" size={19} color="#000" />
              </TouchableOpacity>
            </View>

            <View style={styles.sectionFooter}>
              <TouchableOpacity onPress={handleBookTaxi}>
                <View style={styles.btnPrimary}>
                  <Text style={styles.btnPrimaryText}>Réserver ce taxi</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setSelectedTaxi(null)}>
                <View style={styles.btnEmpty}>
                  <Text style={styles.btnEmptyText}>Annuler</Text>
                </View>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.searchContainer}>
            <TouchableOpacity style={styles.searchButton}>
              <FontAwesome5 name="search-location" size={20} color={COLORS.secondary} />
              <Text style={styles.searchButtonText}>Où allez-vous ?</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  marker: {
    width: 30,
    height: 30,
    backgroundColor: COLORS.primary,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentMarker: {
    backgroundColor: COLORS.secondary,
    borderWidth: 2,
    borderColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  headerActions: {
    alignItems: 'flex-end',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#efefef',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  btnIcon: {
    width: 40,
    height: 40,
    paddingHorizontal: 0,
  },
  btnText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 'bold',
    color: '#000',
    letterSpacing: 0.45,
  },
  btnSm: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: '#efefef',
    borderColor: '#efefef',
    marginLeft: 4,
  },
  btnSmText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: '#000',
  },
  btnPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  btnPrimaryText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '700',
    color: '#fff',
  },
  btnEmpty: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
    marginTop: 4,
  },
  btnEmptyText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '700',
    color: '#1D1D1D',
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sheetHeader: {
    marginBottom: 16,
  },
  sheetTitle: {
    fontSize: 23,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 4,
  },
  sheetSubtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#6d6d6d',
  },
  sheetSection: {
    flexDirection: 'row',
    alignItems: 'center',
   
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: '#E8E8E8',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1d1d1d',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#6d6d6d',
  },
  sectionFooter: {
    marginTop: 16,
  },
  searchContainer: {
    paddingVertical: 16,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  searchButtonText: {
    fontSize: 16,
    color: COLORS.secondary,
    fontWeight: '500',
  },
});
