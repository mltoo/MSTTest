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

}).passthrough().transform((entries, ctx) => {
}
