import { watch } from 'vue'
import { useParticipantStore } from '@/store/participantStore'
import { useBracketStore } from '@/store/bracketStore'
import { useLeaderboardStore } from '@/store/leaderboardStore'

export function useLeaderboardSync() {
  const participants = useParticipantStore()
  const bracket = useBracketStore()
  const leaderboard = useLeaderboardStore()

  watch(
    () => [participants.loaded, participants.participants, bracket.roundWins],
    ([loaded]) => {
      if (loaded) {
        leaderboard.recompute(participants.participants, bracket.roundWins)
      }
    },
    { deep: true, immediate: true }
  )
}
