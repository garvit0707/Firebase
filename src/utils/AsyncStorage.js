import AsyncStorage from "@react-native-async-storage/async-storage";

// Save data
export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    console.log(`Stored ${key}:`, value);
  } catch (e) {
    console.error("Error storing data", e);
  }
};

// Get data
export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return JSON.parse(jsonValue)
  } catch (e) {
    console.error("Error getting data", e);
  }
};

// Delete data
export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log(`${key} removed`);
  } catch (e) {
    console.error("Error removing data", e);
  }
};
