import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/users";

export interface User {
  id: number;
  user_name: string;
  nic_number: string;
  index_number: string;
  faculty: string;
  updated_at: string;
}

export async function getUsers() {
  const { data } = await axios.get<User[]>(API_URL);
  return data;
}

export async function getUserByNic(nic: string) {
  const { data } = await axios.get<User>(`${API_URL}/nic/${nic}`);
  return data;
}

export async function addUser(Data:Object) {
  //console.log(Data)
const { data } = await axios.post<User>(`${API_URL}/`,{
  Data 
});
  return data;
}

export async function addOptions(nic: string, services: number[]) {
  const { data } = await axios.patch(`${API_URL}/options/${nic}`, {
    services,
  });
  return data;
}
