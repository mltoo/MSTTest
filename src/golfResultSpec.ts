import { ZodIssueCode, z } from "zod";

export default z.object({}).passthrough().transform((entries: object, ctx) => {
  //Validate that no entry for STP is not accompanied by an entry for Strokes
  let matcher = new RegExp("^Hole[1-9][0-9]*STP$");
  for (let key in entries) {
    if (matcher.test(key)) {
      if (!(key.substring(0, key.length - "STP".length) + "Strokes" in entries)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Incomplete data for hole from server"
        })
        return z.NEVER;
      }
    }
  }

  //Validate that no entry for Strokes is not accompanied by an entry for STP
  //and assemble list of {STP: x, Strokes: y} datapoints
  let maxHoleNum = 0;
  let holeData: { Strokes: number, STP: number }[] = [];
  matcher = new RegExp("^Hole[1-9][0-9]*Strokes$");
  for (const key in entries) {
    if (matcher.test(key)) {
      let stpKey = key.substring(0, key.length - "Strokes".length) + "STP";
      if (stpKey in entries) {
        let holeNumber: number = +key.substring(
          "Hole".length, key.length - "Strokes".length);
        maxHoleNum = Math.max(holeNumber, maxHoleNum);
        holeData[holeNumber - 1] = {
          Strokes: entries[key as keyof typeof entries],
          STP: entries[stpKey as keyof typeof entries]
        };
      } else {
        ctx.addIssue({
          code: ZodIssueCode.custom,
          message: "Incomplete data for hole from server"
        });
        return z.NEVER;
      }
    }
  }
  if (maxHoleNum != Object.keys(holeData).length) {
    ctx.addIssue({
      code: ZodIssueCode.custom,
      message: "Missing results for some holes in data from server"
    })
    return z.NEVER;
  }
  return { holeData: holeData, ...entries };
}).pipe(z.object({
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

  holeData: z.array(z.object({
    Strokes: z.number(),
    STP: z.number()
  })),

  TotalSTP: z.number(),
  TotalStrokes: z.number(),

  holesPlayed: z.number(),

  lastUpdated: z.string().regex(/^[0-9][0-9]:[0-9][0-9].[0-9]$/),

  matchID: z.number(),
  position: z.number(),
  tournamentID: z.number(),
  teeTime: z.string().regex(/^[0-9][0-9]:[0-9][0-9].[0-9]$/),
  round: z.number()

}))
