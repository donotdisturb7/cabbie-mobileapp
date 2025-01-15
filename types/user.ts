export type UserRole = 'USER' | 'DRIVER';

export interface UserProfile {
  id: string;
  email: string;
  displayName?: string;
  phoneNumber?: string;
  role: UserRole;
  profileImage?: string;
  // Champs spécifiques aux chauffeurs
  driverDetails?: {
    licenseNumber: string;
    carModel: string;
    carPlate: string;
    rating: number;
    isAvailable: boolean;
    currentLocation?: {
      latitude: number;
      longitude: number;
    };
  };
  // Champs spécifiques aux utilisateurs
  userDetails?: {
    favoriteLocations: Array<{
      name: string;
      address: string;
      coordinates: {
        latitude: number;
        longitude: number;
      };
    }>;
    rating: number;
  };
  createdAt: Date;
  updatedAt: Date;
}
