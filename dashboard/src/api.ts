const API_BASE_URL = 'http://127.0.0.1:8000';

// Simple API functions without complex types
export async function fetchStats() {
  try {
    const response = await fetch(`${API_BASE_URL}/stats`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch stats:', error);
    throw error;
  }
}

export async function fetchInventory(limit = 100) {
  try {
    const response = await fetch(`${API_BASE_URL}/inventory?limit=${limit}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch inventory:', error);
    throw error;
  }
}

export async function fetchLegoSets(limit = 100) {
  try {
    const response = await fetch(`${API_BASE_URL}/lego-sets?limit=${limit}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch LEGO sets:', error);
    throw error;
  }
}