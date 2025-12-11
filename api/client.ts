// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  // Tournament
  TOURNAMENT: `${API_BASE_URL}/tournament`,
  
  // Matches
  MATCHES: `${API_BASE_URL}/matches`,
  MATCH_DETAILS: (id: number) => `${API_BASE_URL}/matches/${id}`,
  
  // Registration
  REGISTER: `${API_BASE_URL}/register`,
  GET_REGISTRATIONS: `${API_BASE_URL}/admin/registrations`,
  
  // Contact
  CONTACT: `${API_BASE_URL}/contact`,
  
  // Health
  HEALTH: `${API_BASE_URL}/health`,
};

// API Service
export const apiService = {
  async getTournamentDetails() {
    try {
      const response = await fetch(API_ENDPOINTS.TOURNAMENT);
      return await response.json();
    } catch (error) {
      console.error('Error fetching tournament details:', error);
      throw error;
    }
  },

  async getMatches() {
    try {
      const response = await fetch(API_ENDPOINTS.MATCHES);
      return await response.json();
    } catch (error) {
      console.error('Error fetching matches:', error);
      throw error;
    }
  },

  async getMatchDetails(id: number) {
    try {
      const response = await fetch(API_ENDPOINTS.MATCH_DETAILS(id));
      return await response.json();
    } catch (error) {
      console.error('Error fetching match details:', error);
      throw error;
    }
  },

  async registerPlayer(data: {
    playerName: string;
    playerEmail: string;
    playerPhone: string;
    gameId: string;
    teamName?: string;
  }) {
    try {
      const response = await fetch(API_ENDPOINTS.REGISTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error('Error registering player:', error);
      throw error;
    }
  },

  async getRegistrations() {
    try {
      const response = await fetch(API_ENDPOINTS.GET_REGISTRATIONS);
      return await response.json();
    } catch (error) {
      console.error('Error fetching registrations:', error);
      throw error;
    }
  },

  async submitContactForm(data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) {
    try {
      const response = await fetch(API_ENDPOINTS.CONTACT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }
  },

  async checkHealth() {
    try {
      const response = await fetch(API_ENDPOINTS.HEALTH);
      return await response.json();
    } catch (error) {
      console.error('Error checking server health:', error);
      throw error;
    }
  },
};
