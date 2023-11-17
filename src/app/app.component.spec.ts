import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import golfResultSpec from '../golfResultSpec';

const demoPlayer = {
  "MSTID": 34488,
  "Match": 18,
  "First": "Justin",
  "Last": "Harding",
  "Nationality": "RSA",
  "SOD": null,
  "Score": -1,
  "Today": -1,
  "Hole1Strokes": 4,
  "Hole1STP": 0,
  "Hole2Strokes": 4,
  "Hole2STP": -1,
  "Hole3Strokes": 3,
  "Hole3STP": 0,
  "Hole4Strokes": 4,
  "Hole4STP": 0,
  "Hole5Strokes": 5,
  "Hole5STP": 1,
  "Hole6Strokes": 3,
  "Hole6STP": -1,
  "Hole7Strokes": 3,
  "Hole7STP": 0,
  "Hole8Strokes": 4,
  "Hole8STP": 0,
  "Hole9Strokes": 4,
  "Hole9STP": -1,
  "OutStrokes": 34,
  "OutSTP": -2,
  "Hole10Strokes": 3,
  "Hole10STP": 0,
  "Hole11Strokes": 5,
  "Hole11STP": 0,
  "Hole12Strokes": 6,
  "Hole12STP": 2,
  "Hole13Strokes": 2,
  "Hole13STP": -1,
  "Hole14Strokes": 5,
  "Hole14STP": 1,
  "Hole15Strokes": 3,
  "Hole15STP": -1,
  "Hole16Strokes": 4,
  "Hole16STP": 0,
  "Hole17Strokes": 3,
  "Hole17STP": 0,
  "Hole18Strokes": 5,
  "Hole18STP": 0,
  "InStrokes": 36,
  "InSTP": 1,
  "TotalStrokes": 70,
  "TotalSTP": -1,
  "tournamentID": 2020009,
  "round": 1,
  "orderInMatch": 1,
  "lastUpdated": "09:06.3",
  "status": 1,
  "leaderboardID": 184614,
  "teeStart": 1,
  "teeTime": "12:00.0",
  "holesPlayed": 18,
  "course": 1,
  "matchID": 99796,
  "Amature": 0,
  "isTeam": 0,
  "CalculatedRankInteger": 1801,
  "position": 13,
  "UniquePosition": 9999,
  "TVName": "Harding",
  "Eastern": null,
  "Handicap": 0,
  "SortPriority": null,
  "Sex": "M"
}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });

  it('should create the title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const content = fixture.debugElement;
    fixture.detectChanges();
    expect(content.query(By.css('h1')).nativeElement.innerText).toBe("Golf results:");
  })

  it('should render all of the column headings', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const content = fixture.debugElement;
    fixture.detectChanges();
    const headers = content.queryAll(By.css('th')).map(elem => elem.nativeElement.innerText)
    for (const column of app.columns.concat(app.holeStatColumns)) {
      expect(
        headers.includes(column[0])
        || headers.includes(column[0] + " ▴")
        || headers.includes(column[0] + " ▾")
      ).toBeTruthy()
    }
  });

  it('should render a heading for all of the holes', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const content = fixture.debugElement;
    fixture.detectChanges();
    const headers = content.queryAll(By.css('th')).map(elem => elem.nativeElement.innerText)
    for (let hole = 1; hole <= app.holeCount; hole++) {
      expect(headers.includes("Hole " + hole)).toBeTruthy();
    }
  });

  it('should render all player data in each column', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const content = fixture.debugElement;
    const parsedPlayer = golfResultSpec.parse(demoPlayer)
    app.addResult(parsedPlayer);
    fixture.detectChanges();
    const cells = content.queryAll(By.css('td')).map(elem => elem.nativeElement.innerText);
    for (const column of app.columns) {
      expect(cells).toContain(column[1](parsedPlayer).toString());
    }
  });

  it('should update the sort column on click', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const content = fixture.debugElement;
    fixture.detectChanges();
    let heading;
    for (const currentHeading of content.queryAll(By.css('th'))) {
      if (app.columns.map((col) => col[0]).includes(currentHeading.nativeElement.innerText)) {
        heading = currentHeading;
        break;
      }
    }
    heading?.triggerEventHandler('click');
    fixture.detectChanges();
    let selectedHeadingText = heading?.nativeElement.innerText;
    expect(app.compareCol[0]).toEqual(selectedHeadingText.substring(0, selectedHeadingText.length - 2));

    let initialSortDirection = app.compareAsc;
    heading?.triggerEventHandler('click');
    expect(app.compareAsc).not.toBe(initialSortDirection);
  });
});
