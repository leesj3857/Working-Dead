import type { AxiosResponse } from "axios";
import { apiClient } from "./client";
import type { Participant, Schedule, Rank } from "./type";

const warnFallback = (name: string) => {
  // 에러 객체를 그대로 찍으면 스택/요청 로그가 과하게 길어져 개발이 불편함
  console.warn(`[api fallback] ${name} -> dummy data 반환`);
};

const mockParticipants = (voteId: number): Participant[] => [
  { id: 1, displayName: "홍길동", loggedIn: true },
  { id: 2, displayName: "김철수", loggedIn: false },
  { id: 3, displayName: "이영희", loggedIn: false },
].map((p) => ({ ...p, id: p.id + (voteId - 1) * 1000 }));

const mockVote = (id: number): VoteResponse => ({
  id,
  name: "더미 투표(프론트 개발용)",
  code: "DUMMYCODE",
  startDate: "2026-02-03",
  endDate: "2026-02-10",
  participants: mockParticipants(id),
  shareUrl: `/share/DUMMYCODE`,
  adminUrl: `/admin/DUMMYCODE`,
});

const mockAllVotes = (): AllVotesResponse[] => [
  {
    id: 1,
    name: "더미 투표(1)",
    code: "DUMMYCODE",
    adminUrl: `/admin/DUMMYCODE`,
    shareUrl: `/share/DUMMYCODE`,
    startDate: "2026-02-03",
    endDate: "2026-02-10",
  },
];

const mockDateRange = (): DateRangeResponse => {
  const slots: Schedule[] = [
    {
      date: "2026-02-03",
      slots: [
        { period: "LUNCH", selected: false },
        { period: "DINNER", selected: false },
      ],
    },
    {
      date: "2026-02-04",
      slots: [
        { period: "LUNCH", selected: false },
        { period: "DINNER", selected: false },
      ],
    },
  ];
  return { slots };
};

const mockVoteResult = (voteId: number): VoteResultResponse => {
  const participants = mockParticipants(voteId);
  const rankings: Rank[] = [
    {
      rank: 1,
      date: "2026-02-03",
      period: "LUNCH",
      voteCount: 2,
      priorityScore: 5,
      voters: [
        {
          participantId: participants[0]?.id ?? 1,
          participantName: participants[0]?.displayName ?? "홍길동",
          priorityIndex: 0,
          weight: 3,
        },
        {
          participantId: participants[1]?.id ?? 2,
          participantName: participants[1]?.displayName ?? "김철수",
          priorityIndex: 1,
          weight: 2,
        },
      ],
    },
  ];
  return { voteId, voteName: mockVote(voteId).name, rankings };
};

export interface AllVotesResponse {
  id: number,
  name: string,
  code: string,
  adminUrl: string,
  shareUrl: string,
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
  endDate: string,
  participants: Participant[],
  shareUrl: string,
  adminUrl: string,
}

export interface UpdateVoteRequest {
  name: string,
  startDate: string,
  endDate: string
}
export interface CreateVoteRequest {
  name: string,
  startDate: string,
  endDate: string,
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
  try {
    const response: AxiosResponse<AllVotesResponse[]> = await apiClient.get(
      `/votes`
    );
    return response.data;
  } catch (e) {
    warnFallback("getAllVotes");
    return mockAllVotes();
  }
};

export const getVote = async (
  id: number
): Promise<VoteResponse> => {
  try {
    const response: AxiosResponse<VoteResponse> = await apiClient.get(
      `/votes/${id}`
    );
    return response.data;
  } catch (e) {
    warnFallback("getVote");
    return mockVote(id);
  }
};

export const createVote = async (
  data: CreateVoteRequest
): Promise<VoteResponse> => {
  try {
    const response: AxiosResponse<VoteResponse> = await apiClient.post(
      `/votes`,
      data
    );
    return response.data;
  } catch (e) {
    warnFallback("createVote");
    const created = mockVote(1);
    return {
      ...created,
      name: data.name || created.name,
      startDate: data.startDate || created.startDate,
      endDate: data.endDate || created.endDate,
      participants: (data.participantNames ?? []).map((n, idx) => ({
        id: idx + 1,
        displayName: n,
        loggedIn: false,
      })),
    };
  }
};

export const deleteVote = async (
  id: number
): Promise<void> => {
  try {
    await apiClient.delete(`/votes/${id}`);
  } catch (e) {
    warnFallback("deleteVote");
  }
};

export const updateVote = async (
  id: number,
  data: UpdateVoteRequest
): Promise<VoteResponse> => {
  try {
    const response: AxiosResponse<VoteResponse> = await apiClient.patch(
      `/votes/${id}`,
      data
    );
    return response.data;
  } catch (e) {
    warnFallback("updateVote");
    return {
      ...mockVote(id),
      name: data.name,
      startDate: data.startDate,
      endDate: data.endDate,
    };
  }
};

export const getDateRange = async (
  voteId: number,
  participantId: number
): Promise<DateRangeResponse> => {
  try {
    const response: AxiosResponse<DateRangeResponse> = await apiClient.get(
      `/votes/${voteId}/dateRange`,
      {
        params: {
          participantId,
        },
      }
    );
    return response.data;
  } catch (e) {
    warnFallback("getDateRange");
    return mockDateRange();
  }
};

export const getVoteResult = async (
  voteId: number
): Promise<VoteResultResponse> => {
  try {
    const response: AxiosResponse<VoteResultResponse> = await apiClient.get(
      `/votes/${voteId}/result`
    );
    return response.data;
  } catch (e) {
    warnFallback("getVoteResult");
    return mockVoteResult(voteId);
  }
};

export const getVoteIdByCode = async (
  code: string
): Promise<number | undefined> => {
  try {
    const response: AxiosResponse<VoteResponse> = await apiClient.get(
      `/votes/share/${code}`
    );
    return response.data?.id ?? undefined;
  } catch (e) {
    warnFallback("getVoteIdByCode");
    return 1;
  }
};