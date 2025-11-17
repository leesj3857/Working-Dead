import type { AxiosResponse } from "axios";
import { apiClient } from "./client";
import type { Participant, Schedule, Priority } from "./type";

export interface ScheduleRequest {
  schedules: Schedule[],
  priorities: Priority[],
}
export interface Selection {
  date: string,
  period: string,
  selected: boolean,
}
export interface ScheduleResponse {
  id: number,
  displayName: string,
  selections: Selection[],
  priorities: Priority[],
  submittesAt: string,
  submitted: boolean,
}


export const getParticipants = async (
  voteId: number
): Promise<Participant[]> => {
  const response: AxiosResponse<Participant[]> = await apiClient.get(
    `/votes/${voteId}/participants`
  );
  return response.data;
};

export const addParticipant = async (
  voteId: number,
  displayName: string
): Promise<Participant> => {
  const response: AxiosResponse<Participant> = await apiClient.post(
    `/votes/${voteId}/participants`,
    { displayName }
  );
  return response.data;
};

export const deleteParticipant = async (
  id: number
): Promise<void> => {
  await apiClient.delete(`/participants/${id}`);
};

export const updateSchedule = async (
  id: number,
  data: ScheduleRequest
): Promise<ScheduleResponse> => {
  const response: AxiosResponse<ScheduleResponse> = await apiClient.put(`/participants/${id}/schedule`, data);
  return response.data;
};