import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { FontAwesome5, Feather } from '@expo/vector-icons';
import { COLORS } from '@/constants/theme';

interface Taxi {
  id: number;
  latitude: number;
  longitude: number;
  status: string;
}

interface SearchBottomSheetProps {
  selectedTaxi: Taxi | null;
  onClose: () => void;
  onBook: () => void;
  visible: boolean;
}

export default function SearchBottomSheet({
  selectedTaxi,
  onClose,
  onBook,
  visible,
}: SearchBottomSheetProps) {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      <View style={styles.sheet}>
        <SafeAreaView>
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
                <TouchableOpacity onPress={onBook}>
                  <View style={styles.btnPrimary}>
                    <Text style={styles.btnPrimaryText}>Réserver ce taxi</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={onClose}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    zIndex: 1000,
    pointerEvents: 'box-none',
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingBottom: 90,
  },
  sheetHeader: {
    padding: 20,
    paddingBottom: 0,
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1d1d1d',
    marginBottom: 8,
  },
  sheetSubtitle: {
    fontSize: 14,
    color: '#929292',
  },
  sheetSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1d1d1d',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#929292',
  },
  btnSm: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  btnSmText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1d1d1d',
  },
  sectionFooter: {
    padding: 20,
    gap: 12,
  },
  btnPrimary: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPrimaryText: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.secondary,
  },
  btnEmpty: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnEmptyText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#929292',
  },
  searchContainer: {
    padding: 20,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  searchButtonText: {
    fontSize: 15,
    color: '#929292',
  },
});
