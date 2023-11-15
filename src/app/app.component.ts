import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { io } from 'socket.io-client';
import golfResultSpec from '../golfResultSpec';
import { z } from 'zod';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {
  @Input() socketURL = 'https://mst-full-stack-dev-test.herokuapp.com/';
  socket = io(this.socketURL);
  results: { [MSTID: number]: z.infer<typeof golfResultSpec> } = {}
  holeNumbers = [...Array(18).keys()];

  addResult(result: z.infer<typeof golfResultSpec>) {
    this.results[result.MSTID] = result;
    console.log(this.results);
  }

  ngOnInit() {
    this.socket.on('data-update', (golfer: object) => {
      console.log(golfer);
      try {
        this.addResult(golfResultSpec.parse(golfer));
      } catch {
        console.error("Bad data received from server");
      }
    });
  }
}
