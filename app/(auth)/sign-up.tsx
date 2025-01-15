import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FontAwesome5 } from '@expo/vector-icons';
import { COLORS } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types/user';

export default function SignUpScreen() {
  const { signUp } = useAuth();
  const params = useLocalSearchParams<{ role: UserRole }>();
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });

  const handleSignUp = async () => {
    if (form.password !== form.confirmPassword) {
      // TODO: afficher un message d'erreur
      return;
    }

    try {
      await signUp(form.email, form.password, params.role || 'USER');
    } catch (error) {
      console.error('Sign up error:', error);
      // TODO: afficher un message d'erreur
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e8ecf4' }}>
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <FontAwesome5 
              name={params.role === 'DRIVER' ? 'car' : 'user-alt'} 
              size={40} 
              color={COLORS.primary}
            />
          </View>

          <Text style={styles.title}>
            Inscription <Text style={{ color: COLORS.primary }}>
              {params.role === 'DRIVER' ? 'Chauffeur' : 'Passager'}
            </Text>
          </Text>

          <Text style={styles.subtitle}>
            {params.role === 'DRIVER'
              ? 'Rejoignez notre équipe de chauffeurs'
              : 'Créez votre compte passager'}
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputRow}>
            <View style={[styles.input, styles.inputHalf]}>
              <Text style={styles.inputLabel}>Prénom</Text>
              <TextInput
                style={styles.inputControl}
                placeholder="John"
                placeholderTextColor="#6b7280"
                value={form.firstName}
                onChangeText={(text) => setForm({ ...form, firstName: text })}
              />
            </View>

            <View style={[styles.input, styles.inputHalf]}>
              <Text style={styles.inputLabel}>Nom</Text>
              <TextInput
                style={styles.inputControl}
                placeholder="Doe"
                placeholderTextColor="#6b7280"
                value={form.lastName}
                onChangeText={(text) => setForm({ ...form, lastName: text })}
              />
            </View>
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.inputControl}
              placeholder="john.doe@example.com"
              placeholderTextColor="#6b7280"
              value={form.email}
              onChangeText={(text) => setForm({ ...form, email: text })}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Téléphone</Text>
            <TextInput
              style={styles.inputControl}
              placeholder="+33 6 12 34 56 78"
              placeholderTextColor="#6b7280"
              value={form.phoneNumber}
              onChangeText={(text) => setForm({ ...form, phoneNumber: text })}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Mot de passe</Text>
            <TextInput
              style={styles.inputControl}
              placeholder="********"
              placeholderTextColor="#6b7280"
              value={form.password}
              onChangeText={(text) => setForm({ ...form, password: text })}
              secureTextEntry
            />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Confirmer le mot de passe</Text>
            <TextInput
              style={styles.inputControl}
              placeholder="********"
              placeholderTextColor="#6b7280"
              value={form.confirmPassword}
              onChangeText={(text) => setForm({ ...form, confirmPassword: text })}
              secureTextEntry
            />
          </View>

          <View style={styles.formAction}>
            <TouchableOpacity onPress={handleSignUp}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>S'inscrire</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.formFooter}>
          Déjà un compte ?{' '}
          <Text style={{ textDecorationLine: 'underline' }}>Se connecter</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  title: {
    fontSize: 31,
    fontWeight: '700',
    color: '#1D2A32',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 36,
  },
  headerIcon: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(7, 94, 236, 0.1)',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 36,
  },
  form: {
    marginBottom: 24,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  formFooter: {
    paddingVertical: 24,
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  inputHalf: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    borderWidth: 1,
    borderColor: '#C9D3DB',
    borderStyle: 'solid',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
});
