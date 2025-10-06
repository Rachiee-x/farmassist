const API_BASE_URL = 'https://farmassist-0c78.onrender.com/api';

export interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  location: string;
  farmingAdvice: string;
}

export interface ChatResponse {
  reply: string;
}

export interface GovScheme {
  title: string;
  description: string;
}

export const api = {
  // Weather API
  async getWeather(city?: string): Promise<WeatherData> {
    const params = new URLSearchParams();
    if (city) params.append('city', city);
    
    const response = await fetch(`${API_BASE_URL}/weather?${params.toString()}`);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    return response.json();
  },

  // Chat API (non-streaming)
  async sendMessage(message: string): Promise<ChatResponse> {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to send message');
    }
    return response.json();
  },

  // Streaming Chat API
  async* sendMessageStream(message: string): AsyncGenerator<string, void, unknown> {
    const response = await fetch(`${API_BASE_URL}/chat/stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('No response body');
    }

    const decoder = new TextDecoder();
    
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        yield chunk;
      }
    } finally {
      reader.releaseLock();
    }
  },

  // Government Schemes API
  async getGovSchemes(): Promise<GovScheme[]> {
    const response = await fetch(`${API_BASE_URL}/govschemes`);
    if (!response.ok) {
      throw new Error('Failed to fetch government schemes');
    }
    return response.json();
  },
};
