import { axiosInstance } from "./instance";

interface IFeedback {
  id: number;
  content: string;
  created_at: Date;
}

export type Ratings = {
  id: number,
  text: string,
  count: number
}


export async function addFeedback(
  feedback: Partial<IFeedback>,
  nic_number: string
) {
  const { data } = await axiosInstance.post("/feedbacks", {
    content: feedback.content,
    nic_number
  });
  return data;
}

export async function getFeedbacks() {
  const { data } = await axiosInstance.get<Ratings[]>("/feedbacks");
  return data;
}
