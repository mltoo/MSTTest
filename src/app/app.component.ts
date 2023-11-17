import { Component, Input } from '@angular/core';
import { CommonModule, KeyValue } from '@angular/common';
import { io } from 'socket.io-client';
import golfResultSpec from '../golfResultSpec';
import { z } from 'zod';
import { AppResult } from './app.result';

type GolfResult = z.infer<typeof golfResultSpec>;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, AppResult],
  templateUrl: './app.component.html',
})
export class AppComponent {
  @Input() holeCount = 18;
  @Input() socketURL = 'https://mst-full-stack-dev-test.herokuapp.com/';
  socket = io(this.socketURL);

  columns: [heading: string, getter: (result: GolfResult) => any][] = [
    ["Name", r => {
      if (r.First == r.TVName) {
        return r.First.toUpperCase() + " " + r.Last;
      } else if (r.Last == r.TVName) {
        return r.First + " " + r.Last.toUpperCase();
      } else {
        return r.First + ' "' + r.TVName.toUpperCase() + '" ' + r.Last;
      }
    }],
    ["Sex", r => r.Sex],
    ["Nationality", r => r.Nationality],
    ["Rank", r => r.CalculatedRankInteger],
    ["Handicap", r => r.Handicap],
    ["Match", r => r.Match],
    ["Tournament ID", r => r.tournamentID],
    ["Match ID", r => r.matchID],
    ["Round", r => r.round],
    ["Holes Played", r => r.holesPlayed],
    ["In STP", r => r.InSTP],
    ["In Strokes", r => r.InStrokes],
    ["Out Strokes", r => r.OutStrokes],
  ]
  //appropriate number of holeStat columns generated dynamically in constructor
  holeStatColumns: [string, (result: GolfResult) => any][] = []
  compareCol: [string, (result: GolfResult) => any] = this.columns[3];
  compareAsc = false;
  getResultComparator(compareCol: [string, (result: GolfResult) => any], compareAsc: boolean) {
    return (a: KeyValue<any, GolfResult>, b: KeyValue<any, GolfResult>) => {
      return (compareCol[1](a.value) < compareCol[1](b.value) ? -1 : 1)
        * (compareAsc ? -1 : 1);
    }
  }

  constructor() {
    for (let i = 0; i < this.holeCount; i++) {
      this.holeStatColumns[2 * i] = ["Strokes", r => r.holeData[i].Strokes];
      this.holeStatColumns[2 * i + 1] = ["STP", r => r.holeData[i].STP];
    }
    //Total Stroke/STP columns:
    this.holeStatColumns[2 * this.holeCount] = ["Strokes", r => r.TotalStrokes];
    this.holeStatColumns[2 * this.holeCount + 1] = ["STP", r => r.TotalSTP];
  }

  restrictedLengthResults = golfResultSpec.refine((result) => result.holeData.length == this.holeCount);
  results: { [MSTID: number]: GolfResult } = {}
  addResult(result: z.infer<typeof golfResultSpec>) {
    if (!this.results[result.MSTID] || result.lastUpdated > this.results[result.MSTID]?.lastUpdated) {
      this.results[result.MSTID] = result;
    }
  }

  ngOnInit() {
    this.socket.on('data-update', (golfer: object) => {
      try {
        this.addResult(this.restrictedLengthResults.parse(golfer));
      } catch (e) {
        console.log(e);
      }
    });
  }
}
