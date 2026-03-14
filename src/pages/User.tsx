import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import UserComponent from "../components/user"
import { getVoteByCode, getVote, type VoteResponse } from "../api/vote"

export default function User() {
    const { code } = useParams<{ code?: string }>()

    const { data: vote } = useQuery<VoteResponse | undefined>({
        queryKey: ["voteId", code],
        queryFn: () => getVoteByCode(code ?? ""),
        refetchOnWindowFocus: false,
        enabled: !!code,
    })


    
    return <UserComponent voteId={vote?.id} vote={vote} />
}