import { useState, useEffect } from "react"
import TimeComponent from "../components/time"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getTimePollDetail, getVoteIdbyTimePollId, type TimePollDetailResponse } from "../api/timePoll"
import { getParticipants } from "../api/participant"
import type { Participant } from "../api/type"
import { useDisplayName } from "../context/DisplayNameContext"

const HISTORY_STATE_KEY = "timeParticipantId"

export default function Time() {
    const { pollId } = useParams<{ pollId?: string }>()
    const pollIdNumber = parseInt(pollId ?? "0")
    const { setDisplayName } = useDisplayName()
    const [selectedParticipantId, setSelectedParticipantId] = useState<number | null>(null)

    // 최초 진입 시 현재 단계를 history에 넣어 두어, 참가자 선택 → 시간 선택 후 뒤로가기 가능하게
    useEffect(() => {
        if (selectedParticipantId == null) {
            const current = window.history.state
            if (current?.[HISTORY_STATE_KEY] !== undefined) return
            window.history.replaceState(
                { ...current, [HISTORY_STATE_KEY]: null },
                "",
                window.location.pathname + window.location.search
            )
        }
    }, [selectedParticipantId])

    const { data: voteId } = useQuery({
        queryKey: ["timePollVote", pollIdNumber],
        queryFn: () =>
            pollIdNumber
                ? getVoteIdbyTimePollId(pollIdNumber)
                : Promise.resolve(undefined),
        refetchOnWindowFocus: false,
        enabled: !!pollIdNumber,
    })

    const { data: participants } = useQuery<Participant[] | undefined>({
        queryKey: ["participants", voteId],
        queryFn: () =>
            voteId
                ? getParticipants(voteId)
                : Promise.resolve(undefined),
        refetchOnWindowFocus: false,
        enabled: !!voteId,
    })

    const { data: timePoll } = useQuery<TimePollDetailResponse | undefined>({
        queryKey: ["timePoll", pollIdNumber, selectedParticipantId],
        queryFn: () =>
            pollIdNumber && selectedParticipantId
                ? getTimePollDetail(pollIdNumber, selectedParticipantId)
                : Promise.resolve(undefined),
        refetchOnWindowFocus: false,
        enabled: !!pollIdNumber && !!selectedParticipantId,
    })

    // 같은 URL에서 뒤로가기/앞으로가기 시 단계 복원 + displayName 동기화
    useEffect(() => {
        const handlePopState = (e: PopStateEvent) => {
            const id = e.state?.[HISTORY_STATE_KEY] ?? null
            setSelectedParticipantId(id)
            if (id == null) {
                setDisplayName("")
            } else {
                const participant = participants?.find(p => p.id === id)
                if (participant) {
                    setDisplayName(participant.displayName)
                }
            }
        }

        window.addEventListener("popstate", handlePopState)
        return () => window.removeEventListener("popstate", handlePopState)
    }, [participants, setDisplayName])

    const onParticipantSelect = (id: number) => {
        const participant = participants?.find(p => p.id === id)
        if (participant) {
            setDisplayName(participant.displayName)
        }
        setSelectedParticipantId(id)
        // URL은 그대로 두고 history만 추가 → 뒤로가기 시 참가자 선택 단계로 복귀
        window.history.pushState(
            { ...window.history.state, [HISTORY_STATE_KEY]: id },
            "",
            window.location.pathname + window.location.search
        )
    }

    return (
        <>
            <TimeComponent
                pollId={pollIdNumber}
                participantId={selectedParticipantId ?? undefined}
                timePoll={timePoll}
                participants={participants}
                onParticipantSelect={onParticipantSelect}
            />
        </>
    )
} 