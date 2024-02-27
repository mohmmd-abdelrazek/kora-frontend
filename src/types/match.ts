export interface Match {
    round: number;
    homeTeam: string;
    awayTeam: string;
    playground: string;
    startTime: string;
    endTime: string;
    type: string; // 'Match' or 'Break'
  }