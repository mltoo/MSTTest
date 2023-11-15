import validator from "validator";
import { z } from "zod";

export default z.object({
  MSTID: z.number(),
  First: z.string(),
  Last: z.string(),
  TVName: z.string(),
  Nationality: z.string(), //Could add validator for FIFA country codes
  CalculatedRankInteger: z.number(),
  Sex: z.string(),
  Handicap: z.number(),
  Match: z.number(),
  Score: z.number(),

  Hole1Strokes: z.number(),
  Hole1STP: z.number(),
  Hole2Strokes: z.number(),
  Hole2STP: z.number(),
  Hole3Strokes: z.number(),
  Hole3STP: z.number(),
  Hole4Strokes: z.number(),
  Hole4STP: z.number(),
  Hole5Strokes: z.number(),
  Hole5STP: z.number(),
  Hole6Strokes: z.number(),
  Hole6STP: z.number(),
  Hole7Strokes: z.number(),
  Hole7STP: z.number(),
  Hole8Strokes: z.number(),
  Hole8STP: z.number(),
  Hole9Strokes: z.number(),
  Hole9STP: z.number(),
  Hole10Strokes: z.number(),
  Hole10STP: z.number(),
  Hole11Strokes: z.number(),
  Hole11STP: z.number(),
  Hole12Strokes: z.number(),
  Hole12STP: z.number(),
  Hole13Strokes: z.number(),
  Hole13STP: z.number(),
  Hole14Strokes: z.number(),
  Hole14STP: z.number(),
  Hole15Strokes: z.number(),
  Hole15STP: z.number(),
  Hole16Strokes: z.number(),
  Hole16STP: z.number(),
  Hole17Strokes: z.number(),
  Hole17STP: z.number(),
  Hole18Strokes: z.number(),
  Hole18STP: z.number(),

  InSTP: z.number(),
  InStrokes: z.number(),
  OutStrokes: z.number(),

  TotalSTP: z.number(),
  TotalStrokes: z.number(),

  holesPlayed: z.number(),

  lastUpdated: z.string(), //TODO: validate time format

  matchID: z.number(),
  position: z.number(),
  tournamentID: z.number(),
  teeTime: z.string(), //TODO: validate time format
  round: z.number()

})
