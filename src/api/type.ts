export interface Participant {
    id: number,
    displayName: string,
    loggedIn: boolean
}
export type Period = 'LUNCH' | 'DINNER';

export interface Slot {
    period: string,
    selected: boolean
}
  
export interface Schedule {
    date: string,
    slots: Slot[]
}

export interface Voter {
    participantId: number,
    participantName: string,
    priorityIndex: number,
    weight: number,
}

export interface Rank {
    rank: number,
    date: string,
    period: string,
    voteCount: number,
    priorityScore: number,
    voters: Voter[]
}

export interface Priority {
    date: string,
    period: string,
    priorityIndex: number,
    weight: number,

}