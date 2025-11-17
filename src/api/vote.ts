import type { AxiosResponse } from "axios";
import { apiClient } from "./client";
import type { Participant, Schedule, Rank } from "./type";

export interface AllVotesResponse {
  id: number,
  name: string,
  code: string,
  adminUrl: string,
  sharedUrl: string,
  startDate: string,
  endDate: string
}

export interface VoteRequest {
  slotNo: number;
}

export interface VoteResponse {
  id: number,
  name: string,
  code: string,
  startDate: string,
  endDate: string
  participants: Participant[]
}

export interface UpdateVoteRequest {
  name: string,
  startDate: string,
  endDate: string
}
export interface CreateVoteRequest {
  name: string,
  startDate: string,
  endDate: string
  participantNames: string[]
}


export interface DateRangeResponse {
  slots: Schedule[]
}


export interface VoteResultResponse {
  voteId: number,
  voteName: string,
  rankings: Rank[]
}

export const getAllVotes = async (): Promise<AllVotesResponse[]> => {
  const response: AxiosResponse<AllVotesResponse[]> = await apiClient.get(
    `/votes`
  );
  return response.data;
};

export const getVote = async (
  id: number
): Promise<VoteResponse> => {
  const response: AxiosResponse<VoteResponse> = await apiClient.get(
    `/votes/${id}`
  );
  return response.data;
};

export const createVote = async (
  data: CreateVoteRequest
): Promise<VoteResponse> => {
  const response: AxiosResponse<VoteResponse> = await apiClient.post(
    `/votes`,
    data
  );
  return response.data;
};

export const deleteVote = async (
  id: number
): Promise<void> => {
  await apiClient.delete(`/votes/${id}`);
};

export const updateVote = async (
  id: number,
  data: UpdateVoteRequest
): Promise<VoteResponse> => {
  const response: AxiosResponse<VoteResponse> = await apiClient.patch(
    `/votes/${id}`,
    data
  );
  return response.data;
};

export const getDateRange = async (
  voteId: number,
  participantId: number
): Promise<DateRangeResponse> => {
  const response: AxiosResponse<DateRangeResponse> = await apiClient.get(
    `/votes/${voteId}/dateRange`,
    {
      params: {
        participantId,
      },
    }
  );
  return response.data;
};

export const getVoteResult = async (
  voteId: number
): Promise<VoteResultResponse> => {
  const response: AxiosResponse<VoteResultResponse> = await apiClient.get(
    `/votes/${voteId}/result`
  );
  return response.data;
};

