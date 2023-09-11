import axios from "axios";

interface IFeedback {
  id: number;
  content: string;
  created_at: Date;
}

const API_URL = import.meta.env.VITE_API_URL + "/feedback";

export async function addFeedback(
  feedback: Partial<IFeedback>,
  nic_number: string
) {
  const { data } = await axios.post(`${API_URL}/${nic_number}`, feedback);
  return data;
}

export async function getFeedbacks() {
  const { data } = await axios.get<IFeedback[]>(API_URL);
  return data;
}
