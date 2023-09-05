import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/users";

interface User {
  id: number;
  name: string;
  nic_number: string;
}

export async function getUsers() {
  const { data } = await axios.get<User[]>(API_URL);
  return data;
}
