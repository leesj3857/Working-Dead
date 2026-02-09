import type { AxiosResponse } from "axios";
import { apiClient } from "./client";
import type { Participant, Schedule, Priority } from "./type";

const warnFallback = (name: string) => {
  // 에러 객체를 그대로 찍으면 스택/요청 로그가 과하게 길어져 개발이 불편함
  console.warn(`[api fallback] ${name} -> dummy data 반환`);
};

const mockParticipants = (voteId: number): Participant[] => [
  { id: 1, displayName: "홍길동", loggedIn: true },
  { id: 2, displayName: "김철수", loggedIn: false },
  { id: 3, displayName: "이영희", loggedIn: false },
].map((p) => ({ ...p, id: p.id + (voteId - 1) * 1000 }));

const mockPriorities = (): Priority[] => [
];

const mockScheduleResponse = (participantId: number): ScheduleResponse => ({
  id: participantId,
  displayName: "더미 참가자",
  selections: [
    { date: "2026-02-03", period: "LUNCH", selected: true },
    { date: "2026-02-03", period: "DINNER", selected: false },
  ],
  priorities: mockPriorities(),
  submittesAt: new Date().toISOString(),
  submitted: true,
});

const mockParticipantChoices = (
  participantId: number
): ParticipantChoiceResponse => ({
  participantId,
  displayName: "더미 참가자",
  selections: [
    { date: "2026-02-03", period: "LUNCH", selected: true },
    { date: "2026-02-03", period: "DINNER", selected: false },
  ],
  priorities: mockPriorities(),
});

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

export interface ParticipantChoiceResponse {
  participantId: number,
  displayName: string,
  selections: Selection[],
  priorities: Priority[],
}
export const getParticipants = async (
  voteId: number
): Promise<Participant[]> => {
  try {
    const response: AxiosResponse<Participant[]> = await apiClient.get(
      `/votes/${voteId}/participants`
    );
    return mockParticipants(voteId);
    // return response.data?.sort((a, b) => a.id - b.id);
  } catch (e) {
    warnFallback("getParticipants");
    return mockParticipants(voteId);
  }
};

export const addParticipant = async (
  voteId: number,
  displayName: string
): Promise<Participant> => {
  try {
    const response: AxiosResponse<Participant> = await apiClient.post(
      `/votes/${voteId}/participants`,
      { displayName }
    );
    return response.data;
  } catch (e) {
    warnFallback("addParticipant");
    return { id: Date.now(), displayName, loggedIn: false };
  }
};

export const deleteParticipant = async (
  id: number
): Promise<void> => {
  try {
    await apiClient.delete(`/participants/${id}`);
  } catch (e) {
    warnFallback("deleteParticipant");
  }
};

export const updateParticipant = async (
  participantId: number,
  displayName: string
): Promise<void> => {
  try {
    await apiClient.patch(`/participants/${participantId}`, { displayName });
  } catch (e) {
    warnFallback("updateParticipant");
  }
};

export const updateSchedule = async (
  id: number,
  data: ScheduleRequest
): Promise<ScheduleResponse> => {
  try {
    const response: AxiosResponse<ScheduleResponse> = await apiClient.patch(
      `/participants/${id}/schedule`,
      data
    );
    return response.data;
  } catch (e) {
    warnFallback("updateSchedule");

    const selections =
      data.schedules?.flatMap((s) =>
        s.slots.map((slot) => ({
          date: s.date,
          period: slot.period,
          selected: slot.selected,
        }))
      ) ?? [];

    return {
      ...mockScheduleResponse(id),
      id,
      selections,
      priorities: data.priorities ?? mockPriorities(),
    };
  }
};

export const getParticipantChoices = async (
  participantId: number
): Promise<ParticipantChoiceResponse> => {
  try {
    const response: AxiosResponse<ParticipantChoiceResponse> =
      await apiClient.get(`/participants/${participantId}/choices`);
    return mockParticipantChoices(participantId);
    // return response.data;
  } catch (e) {
    warnFallback("getParticipantChoices");
    return mockParticipantChoices(participantId);
  }
};