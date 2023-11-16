import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { io } from 'socket.io-client';
import golfResultSpec from '../golfResultSpec';
import { z } from 'zod';
import { AppResult } from './app.result';

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

  restrictedLengthResults = golfResultSpec.refine((result) => result.holeData.length == this.holeCount );
  results: { [MSTID: number]: z.infer<typeof golfResultSpec> } = {}

  addResult(result: z.infer<typeof golfResultSpec>) {
    this.results[result.MSTID] = result;
    console.log(this.results);
  }

  ngOnInit() {
    this.socket.on('data-update', (golfer: object) => {
      console.log(golfer);
      try {
        this.addResult(this.restrictedLengthResults.parse(golfer));
      } catch(e) {
        console.log(e);
      }
    });
  }
}
