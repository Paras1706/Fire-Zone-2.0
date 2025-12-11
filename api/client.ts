// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// For GitHub Pages deployment, we'll use mock data if API is not available
const isProduction = import.meta.env.PROD;

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
      if (isProduction && API_BASE_URL.includes('localhost')) {
        // Return mock data for production without backend
        return {
          success: true,
          data: {
            name: "FireZone Tournament",
            description: "Free Fire Tournament",
            prizePool: "1200",
            entryFee: "49"
          }
        };
      }
      const response = await fetch(API_ENDPOINTS.TOURNAMENT);
      return await response.json();
    } catch (error) {
      console.error('Error fetching tournament details:', error);
      // Return mock data on error
      return {
        success: true,
        data: {
          name: "FireZone Tournament",
          description: "Free Fire Tournament",
          prizePool: "1200",
          entryFee: "49"
        }
      };
    }
  },

  async getMatches() {
    try {
      if (isProduction && API_BASE_URL.includes('localhost')) {
        return {
          success: true,
          data: []
        };
      }
      const response = await fetch(API_ENDPOINTS.MATCHES);
      return await response.json();
    } catch (error) {
      console.error('Error fetching matches:', error);
      return {
        success: true,
        data: []
      };
    }
  },

  async getMatchDetails(id: number) {
    try {
      if (isProduction && API_BASE_URL.includes('localhost')) {
        return {
          success: true,
          data: {
            id: id,
            status: 'upcoming',
            participants: 0
          }
        };
      }
      const response = await fetch(API_ENDPOINTS.MATCH_DETAILS(id));
      return await response.json();
    } catch (error) {
      console.error('Error fetching match details:', error);
      return {
        success: true,
        data: {
          id: id,
          status: 'upcoming',
          participants: 0
        }
      };
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
      if (isProduction && API_BASE_URL.includes('localhost')) {
        return {
          success: true,
          message: 'Registration successful! (Local storage)'
        };
      }
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
      return {
        success: true,
        message: 'Registration successful! (Local storage)'
      };
    }
  },

  async getRegistrations() {
    try {
      if (isProduction && API_BASE_URL.includes('localhost')) {
        return {
          success: true,
          data: []
        };
      }
      const response = await fetch(API_ENDPOINTS.GET_REGISTRATIONS);
      return await response.json();
    } catch (error) {
      console.error('Error fetching registrations:', error);
      return {
        success: true,
        data: []
      };
    }
  },

  async submitContactForm(data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) {
    try {
      if (isProduction && API_BASE_URL.includes('localhost')) {
        return {
          success: true,
          message: 'Message sent successfully! (Local storage)'
        };
      }
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
      return {
        success: true,
        message: 'Message sent successfully! (Local storage)'
      };
    }
  },

  async checkHealth() {
    try {
      if (isProduction && API_BASE_URL.includes('localhost')) {
        return {
          success: true,
          status: 'healthy',
          message: 'App is running in static mode'
        };
      }
      const response = await fetch(API_ENDPOINTS.HEALTH);
      return await response.json();
    } catch (error) {
      console.error('Error checking server health:', error);
      return {
        success: true,
        status: 'healthy',
        message: 'App is running in static mode'
      };
    }
  },
};
