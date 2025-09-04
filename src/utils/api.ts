const API_BASE_URL = 'http://localhost:5000/api';

// Generic API call function
async function apiCall<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Network error' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return {} as T;
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Driver API
export const driverApi = {
  // List drivers with pagination and filters
  list: (params: {
    page?: number;
    limit?: number;
    search?: string;
    city?: string;
    status?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  } = {}) => {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        queryParams.append(key, value.toString());
      }
    });
    
    const queryString = queryParams.toString();
    return apiCall<{
      data: any[];
      meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
      };
    }>(`/drivers${queryString ? `?${queryString}` : ''}`);
  },

  // Get single driver
  get: (id: string) => apiCall<any>(`/drivers/${id}`),

  // Create driver
  create: (data: {
    name: string;
    phone: string;
    email: string;
    city?: string;
    license?: string;
    aadhar?: string;
    pan?: string;
    status?: string;
  }) => apiCall<any>('/drivers', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  // Update driver
  update: (id: string, data: Partial<{
    name: string;
    phone: string;
    email: string;
    city: string;
    license: string;
    aadhar: string;
    pan: string;
    status: string;
  }>) => apiCall<any>(`/drivers/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),

  // Delete driver
  delete: (id: string) => apiCall<void>(`/drivers/${id}`, {
    method: 'DELETE',
  }),
};

// User API
export const userApi = {
  // List users with pagination and filters
  list: (params: {
    page?: number;
    limit?: number;
    search?: string;
    city?: string;
    status?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  } = {}) => {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        queryParams.append(key, value.toString());
      }
    });
    
    const queryString = queryParams.toString();
    return apiCall<{
      data: any[];
      meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
      };
    }>(`/users${queryString ? `?${queryString}` : ''}`);
  },

  // Get single user
  get: (id: string) => apiCall<any>(`/users/${id}`),

  // Create user
  create: (data: {
    name: string;
    phone: string;
    email: string;
    city?: string;
    status?: string;
  }) => apiCall<any>('/users', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  // Update user
  update: (id: string, data: Partial<{
    name: string;
    phone: string;
    email: string;
    city: string;
    status: string;
  }>) => apiCall<any>(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),

  // Delete user
  delete: (id: string) => apiCall<void>(`/users/${id}`, {
    method: 'DELETE',
  }),
};

// Health check
export const healthApi = {
  check: () => apiCall<{ ok: boolean }>('/health'),
};