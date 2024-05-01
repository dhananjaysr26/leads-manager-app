import * as SecureStore from 'expo-secure-store';

const secureStoreHelper = {
  async getToken(key: string) {
    try {
      const stringifiedValue = await SecureStore.getItemAsync(key);
      if (stringifiedValue) {
        return JSON.parse(stringifiedValue);
      }
    } catch (err) {
      console.error('Error getting token from secure store:', err);
      return null;
    }
  },

  async saveToken(key: string, value: string) {
    const stringifiedValue = JSON.stringify(value);
    try {
      await SecureStore.setItemAsync(key, stringifiedValue);
    } catch (err) {
      console.error('Error saving token to secure store:', err);
    }
  },
};

export default secureStoreHelper;
