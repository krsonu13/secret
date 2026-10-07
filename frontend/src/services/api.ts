import axios from 'axios';
import { BirthdayInfo, Memory, TimelineEvent, Reason, Wish, MusicConfig, User } from '../types';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

const client = axios.create({
  baseURL: API_BASE,
  withCredentials: true
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('birthday_admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const api = {
  // Public APIs
  getBirthday: async () => (await client.get<{ success: boolean; data: BirthdayInfo }>('/birthday')).data.data,
  getMemories: async () => (await client.get<{ success: boolean; data: Memory[] }>('/memories')).data.data,
  getTimeline: async () => (await client.get<{ success: boolean; data: TimelineEvent[] }>('/timeline')).data.data,
  getReasons: async () => (await client.get<{ success: boolean; data: Reason[] }>('/reasons')).data.data,
  getWishes: async () => (await client.get<{ success: boolean; data: Wish[] }>('/wishes')).data.data,
  submitWish: async (payload: { name: string; relationship: string; message: string }) =>
    (await client.post<{ success: boolean; message: string; data: Wish }>('/wishes', payload)).data,
  getMusic: async () => (await client.get<{ success: boolean; data: MusicConfig }>('/music')).data.data,

  // Auth APIs
  login: async (credentials: { email: string; password: string }) => {
    const res = await client.post<{ success: boolean; token: string; user: User }>('/auth/login', credentials);
    if (res.data.token) {
      localStorage.setItem('birthday_admin_token', res.data.token);
    }
    return res.data;
  },
  logout: async () => {
    localStorage.removeItem('birthday_admin_token');
    return (await client.post<{ success: boolean }>('/auth/logout')).data;
  },
  getMe: async () => (await client.get<{ success: boolean; user: User }>('/auth/me')).data.user,

  // Admin APIs
  updateBirthday: async (data: Partial<BirthdayInfo>) =>
    (await client.put<{ success: boolean; data: BirthdayInfo }>('/admin/birthday', data)).data.data,

  createMemory: async (formData: FormData) =>
    (await client.post<{ success: boolean; data: Memory }>('/admin/memories', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })).data.data,

  updateMemory: async (id: string, formData: FormData) =>
    (await client.put<{ success: boolean; data: Memory }>(`/admin/memories/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })).data.data,

  deleteMemory: async (id: string) =>
    (await client.delete<{ success: boolean }>(`/admin/memories/${id}`)).data,

  createTimelineEvent: async (formData: FormData) =>
    (await client.post<{ success: boolean; data: TimelineEvent }>('/admin/timeline', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })).data.data,

  updateTimelineEvent: async (id: string, formData: FormData) =>
    (await client.put<{ success: boolean; data: TimelineEvent }>(`/admin/timeline/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })).data.data,

  deleteTimelineEvent: async (id: string) =>
    (await client.delete<{ success: boolean }>(`/admin/timeline/${id}`)).data,

  createReason: async (data: Partial<Reason>) =>
    (await client.post<{ success: boolean; data: Reason }>('/admin/reasons', data)).data.data,

  updateReason: async (id: string, data: Partial<Reason>) =>
    (await client.put<{ success: boolean; data: Reason }>(`/admin/reasons/${id}`, data)).data.data,

  deleteReason: async (id: string) =>
    (await client.delete<{ success: boolean }>(`/admin/reasons/${id}`)).data,

  getAdminWishes: async () =>
    (await client.get<{ success: boolean; data: Wish[] }>('/admin/wishes')).data.data,

  approveWish: async (id: string) =>
    (await client.patch<{ success: boolean; data: Wish }>(`/admin/wishes/${id}/approve`)).data.data,

  rejectWish: async (id: string) =>
    (await client.patch<{ success: boolean; data: Wish }>(`/admin/wishes/${id}/reject`)).data.data,

  deleteWish: async (id: string) =>
    (await client.delete<{ success: boolean }>(`/admin/wishes/${id}`)).data,

  updateMusic: async (formData: FormData) =>
    (await client.put<{ success: boolean; data: MusicConfig }>('/admin/music', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })).data.data
};
