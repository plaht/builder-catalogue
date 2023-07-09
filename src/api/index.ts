import { User } from '@/types';

const API_URL = process.env.API_URL;

console.log('API_URL', API_URL);

const fetchUsers = async () => {
  const res = await fetch(`${API_URL}/users`);
  const users = await res.json();
  return users;
};

const fetchUserById = async (id: string): Promise<User> => {
  const res = await fetch(`${API_URL}/user/by-id/${id}`);
  const user = await res.json();

  return user;
};

const fetchSets = async () => {
  const res = await fetch(`${API_URL}/sets`);
  const sets = await res.json();

  return sets;
};

const fetchSetById = async (id: string) => {
  const res = await fetch(`${API_URL}/set/by-id/${id}`);
  const set = await res.json();

  return set;
};

const fetchColours = async () => {
  const res = await fetch(`${API_URL}/colours`);
  const colours = await res.json();
  return colours;
};

export { fetchUsers, fetchUserById, fetchSets, fetchSetById, fetchColours };
