import { deleteItem } from "./storageService";

const API_URL = 'http://192.168.1.46:8080/api/v1';

export const register = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (e: unknown) {
    const error = e as Error;
    console.error('Error during register:', error.message);
    return { error: true, message: error.message };
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/auth/signIn`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept-Language': 'es',
      },
      body: JSON.stringify({ email, password }),
    });
    console.log(response);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
    console.log("LOGIN RESULT 😁", result);
    return result;
  } catch (e: unknown) {
    const error = e as Error;
    console.error('Error during login:', error.message);
    return { error: true, msg: error.message };
  }
};

export const logout = async () => {
  await deleteItem('token');
};
