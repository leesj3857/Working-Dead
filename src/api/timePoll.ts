import type { AxiosResponse } from "axios";
import { apiClient } from "./client";

export type TimePollStatus = "ONGOING" | "CONFIRMED" | "CANCELLED";

export interface TimePollDetailResponse {
  id: number;
  confirmedDate: string | null;
  status: TimePollStatus;
  finalizedTime: string | null;
  totalParticipants: number;
  submittedCount: number;
  alreadySubmitted: boolean;
  mySelection: string | null;
}

export interface TimePollStatusEntry {
  displayName: string;
  selectedTime: string;
}

export interface TimePollStatusResponse {
  timePollId: number;
  confirmedDate: string | null;
  status: TimePollStatus;
  finalizedTime: string | null;
  totalParticipants: number;
  submittedCount: number;
  allSubmitted: boolean;
  entries: TimePollStatusEntry[];
  pendingNames: string[];
}

export interface SubmitTimePollRequest {
  participantId: number;
  selectedTime: string;
}

/**
 * GET /time-polls/{pollId}
 * 참가자의 개인 선택 정보 포함 상세 조회
 */
export const getTimePollDetail = async (
  pollId: number,
  participantId: number
): Promise<TimePollDetailResponse> => {
  const response: AxiosResponse<TimePollDetailResponse> = await apiClient.get(
    `/time-polls/${pollId}`,
    {
      params: {
        participantId,
      },
    }
  );
  return response.data;
};

/**
 * GET /time-polls/{pollId}/status
 * 전체 투표 현황 조회
 */
export const getTimePollStatus = async (
  pollId: number
): Promise<TimePollStatusResponse> => {
  const response: AxiosResponse<TimePollStatusResponse> = await apiClient.get(
    `/time-polls/${pollId}/status`
  );
  return response.data;
};

/**
 * POST /time-polls/{pollId}/submit
 * 참가자 투표 제출
 */
export const submitTimePoll = async (
  pollId: number,
  body: SubmitTimePollRequest
): Promise<TimePollStatusResponse> => {
  const response: AxiosResponse<TimePollStatusResponse> = await apiClient.post(
    `/time-polls/${pollId}/submit`,
    body
  );
  return response.data;
};

/**
 * POST /time-polls/{pollId}/finalize
 * 최종 시간 확정
 */
export const finalizeTimePoll = async (
  pollId: number
): Promise<TimePollStatusResponse> => {
  const response: AxiosResponse<TimePollStatusResponse> = await apiClient.post(
    `/time-polls/${pollId}/finalize`
  );
  return response.data;
};

/**
 * POST /time-polls/{pollId}/accept
 * 최종 확정 시간 수락 (참가자 개별)
 */
export const acceptTimePoll = async (
  pollId: number,
  participantId: number
): Promise<TimePollStatusResponse> => {
  const response: AxiosResponse<TimePollStatusResponse> = await apiClient.post(
    `/time-polls/${pollId}/accept`,
    null,
    {
      params: {
        participantId,
      },
    }
  );
  return response.data;
};

