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

const fetchColors = async (apiUrl: string) => {
  return {
    colours: [
      { name: 'White', code: 1 },
      { name: 'Very Light Gray', code: 49 },
      { name: 'Very Light Bluish Gray', code: 99 },
      { name: 'Light Bluish Gray', code: 86 },
      { name: 'Light Gray', code: 9 },
      { name: 'Dark Gray', code: 10 },
      { name: 'Dark Bluish Gray', code: 85 },
      { name: 'Black', code: 11 },
      { name: 'Dark Red', code: 59 },
      { name: 'Red', code: 5 },
      { name: 'Rust', code: 27 },
      { name: 'Coral', code: 220 },
      { name: 'Dark Salmon', code: 231 },
      { name: 'Salmon', code: 25 },
      { name: 'Light Salmon', code: 26 },
      { name: 'Sand Red', code: 58 },
      { name: 'Reddish Brown', code: 88 },
      { name: 'Brown', code: 8 },
      { name: 'Dark Brown', code: 120 },
      { name: 'Dark Tan', code: 69 },
      { name: 'Tan', code: 2 },
      { name: 'Light Nougat', code: 90 },
      { name: 'Nougat', code: 28 },
      { name: 'Medium Nougat', code: 150 },
      { name: 'Dark Nougat', code: 225 },
      { name: 'Medium Brown', code: 91 },
      { name: 'Fabuland Brown', code: 106 },
      { name: 'Fabuland Orange', code: 160 },
      { name: 'Earth Orange', code: 29 },
      { name: 'Dark Orange', code: 68 },
      { name: 'Neon Orange', code: 165 },
      { name: 'Orange', code: 4 },
      { name: 'Medium Orange', code: 31 },
      { name: 'Bright Light Orange', code: 110 },
      { name: 'Light Orange', code: 32 },
      { name: 'Very Light Orange', code: 96 },
      { name: 'Dark Yellow', code: 161 },
      { name: 'Yellow', code: 3 },
      { name: 'Bright Light Yellow', code: 103 },
      { name: 'Light Yellow', code: 33 },
      { name: 'Light Lime', code: 35 },
      { name: 'Yellowish Green', code: 158 },
      { name: 'Neon Green', code: 166 },
      { name: 'Medium Lime', code: 76 },
      { name: 'Lime', code: 34 },
      { name: 'Olive Green', code: 155 },
      { name: 'Dark Green', code: 80 },
      { name: 'Green', code: 6 },
      { name: 'Bright Green', code: 36 },
      { name: 'Medium Green', code: 37 },
      { name: 'Light Green', code: 38 },
      { name: 'Sand Green', code: 48 },
      { name: 'Dark Turquoise', code: 39 },
      { name: 'Light Turquoise', code: 40 },
      { name: 'Aqua', code: 41 },
      { name: 'Light Aqua', code: 152 },
      { name: 'Dark Blue', code: 63 },
      { name: 'Blue', code: 7 },
      { name: 'Dark Azure', code: 153 },
      { name: 'Medium Azure', code: 156 },
      { name: 'Medium Blue', code: 42 },
      { name: 'Bright Light Blue', code: 105 },
      { name: 'Light Blue', code: 62 },
      { name: 'Sky Blue', code: 87 },
      { name: 'Sand Blue', code: 55 },
      { name: 'Blue-Violet', code: 97 },
      { name: 'Dark Blue-Violet', code: 109 },
      { name: 'Violet', code: 43 },
      { name: 'Medium Violet', code: 73 },
      { name: 'Light Violet', code: 44 },
      { name: 'Dark Purple', code: 89 },
      { name: 'Purple', code: 24 },
      { name: 'Light Purple', code: 93 },
    ],
    disclaimer:
      'This is a subset of the BrickLink colour catalogue, please do not take it as complete or authoritative :)',
  };
};

export { fetchUsers, fetchUserById, fetchSets, fetchSetById, fetchColors };
