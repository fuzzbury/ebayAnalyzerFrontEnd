import { InventoryItem, LegoSet, Stats, Image, GetInventoryParams, GetLegoSetsParams } from '../types/api';

const API_BASE_URL = 'http://127.0.0.1:8000';

class ApiService {
  private async fetchJson<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const url = new URL(endpoint, API_BASE_URL);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }

  async getRoot(): Promise<any> {
    return this.fetchJson('/');
  }

  async getInventory(params: GetInventoryParams = {}): Promise<InventoryItem[]> {
    return this.fetchJson('/inventory', params);
  }

  async getInventoryItem(inventoryId: number): Promise<InventoryItem> {
    return this.fetchJson(`/inventory/${inventoryId}`);
  }

  async getImagesForItem(inventoryId: number): Promise<Image[]> {
    return this.fetchJson(`/images/${inventoryId}`);
  }

  async getLegoSets(params: GetLegoSetsParams = {}): Promise<LegoSet[]> {
    return this.fetchJson('/lego-sets', params);
  }

  async getLegoSet(setNumber: number): Promise<LegoSet> {
    return this.fetchJson(`/lego-sets/${setNumber}`);
  }

  async getStats(): Promise<Stats> {
    return this.fetchJson('/stats');
  }
}

export const apiService = new ApiService();