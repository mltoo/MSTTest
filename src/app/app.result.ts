import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import golfResultSpec from '../golfResultSpec';
import { z } from 'zod';

@Component({
  selector: '[app-result]',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.result.html'
})
export class AppResult {
  @Input({ required: true }) result!: z.infer<typeof golfResultSpec>;
  @Input({ required: true }) columns!: [string, (result: z.infer<typeof golfResultSpec>) => any][]
}
