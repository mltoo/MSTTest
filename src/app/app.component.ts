import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {
  @Input() socketURL = 'https://mst-full-stack-dev-test.herokuapp.com/';
  socket = io(this.socketURL);
  ngOnInit() {
    this.socket.on('data-update', (golfer) => {
      console.log(golfer);
    });
  }
}
