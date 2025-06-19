import axios from 'axios';
import { User, CreateUserRequest, UpdateUserRequest } from '@/types/user';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const userService = {
  // Buscar todos os usuários
  getUsers: async (): Promise<User[]> => {
    const response = await api.get('/api/go/users');
    return response.data;
  },

  // Buscar usuário por ID
  getUser: async (id: number): Promise<User> => {
    const response = await api.get(`/api/go/users/${id}`);
    return response.data;
  },

  // Criar novo usuário
  createUser: async (userData: CreateUserRequest): Promise<User> => {
    const response = await api.post('/api/go/users', userData);
    return response.data;
  },

  // Atualizar usuário
  updateUser: async (id: number, userData: UpdateUserRequest): Promise<User> => {
    const response = await api.put(`/api/go/users/${id}`, userData);
    return response.data;
  },

  // Deletar usuário
  deleteUser: async (id: number): Promise<void> => {
    await api.delete(`/api/go/users/${id}`);
  },
}; 