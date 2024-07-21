import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'token';

export const storeItem = async (token: string, value: string) => {
  await AsyncStorage.setItem(token, value);
};

export const getItem = async (token: string) => {
  const item = await AsyncStorage.getItem(token);
  return item;
};

export const deleteItem = async (token: string) => {
  await AsyncStorage.removeItem(token);
};
