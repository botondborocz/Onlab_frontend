import {Component, ViewEncapsulation} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_NATIVE_DATE_FORMATS,
  MatNativeDateModule,
  NativeDateAdapter
} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, UntypedFormControl} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {NgClass, NgStyle} from "@angular/common";
import {ThemeService} from "../../../theme.service";
import {Championship, Game, Team} from "../../../interfaces"

@Component({
  selector: 'app-dialogcontentaddgame',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule,
    MatSelectModule, MatButtonModule,
    MatTooltipModule, MatIconModule,
    MatDatepickerModule, MatNativeDateModule,
    MatDialogModule, MatCardModule, NgClass, NgStyle],
  templateUrl: './dialogcontentaddgame.component.html',
  styleUrl: './dialogcontentaddgame.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {provide: DateAdapter, useClass: NativeDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS}
  ]
})
export class DialogcontentaddgameComponent {
  id: number = 0;
  isDarkMode: boolean;

  constructor(private themeService: ThemeService, private formBuilder: FormBuilder, private http: HttpClient, private snackBar: MatSnackBar) {
    this.getChampionships();
    this.isDarkMode = themeService.isDarkMode();
  }

  teams: Team[] = [];
  championships: Championship[] = [];


  gameForm = this.formBuilder.group({
    datepicker: new FormControl(),
    homeTeam: new UntypedFormControl(null, []),
    awayTeam: new UntypedFormControl(null, []),
    homeScore: new UntypedFormControl(null, []),
    awayScore: new UntypedFormControl(null, []),
    championship: new UntypedFormControl(null, [])
  })

  /**
   * Retrieves teams for the selected championship.
   */
  getTeamsForChampionship() {
    const selectedChampionshipId = {
      params: {"championshipId": this.gameForm.value.championship}
    }
    this.http.get<Team[]>('/api/general/teams', selectedChampionshipId).subscribe(
      data => {
        console.log(data);
        this.teams = data;
      }
    )
  }

  /**
   * Retrieves all championships.
   */
  getChampionships() {
    this.http.get<Championship[]>('/api/general/allchampionships').subscribe(
      data => {
        console.log(data);
        this.championships = data;
      }
    )
  }


  /**
   * Saves the new game.
   */
  save() {
    if (!this.gameForm.valid) {
      return;
    }
    let gameData: Game = {
      id: this.id,
      date: this.gameForm.value.datepicker,
      homeTeamName: this.gameForm.value.homeTeam.teamName,
      homeTeamId: this.gameForm.value.homeTeam.id,
      homeScore: this.gameForm.value.homeScore,
      awayScore: this.gameForm.value.awayScore,
      awayTeamName: this.gameForm.value.awayTeam.teamName,
      awayTeamId: this.gameForm.value.awayTeam.id,
      champId: this.gameForm.value.championship,
    }
    this.http.post<Game>('/api/admin/newgame', gameData).subscribe({
      next: (response) => console.log(response),
      error: (error) => {
        (this.snackBar).open(
          "New game failed", 'Close', {duration: 10000, horizontalPosition: 'center', verticalPosition: 'top'}
        );
      },
      complete: () => {
        (this.snackBar).open(
          "New game added", "Close", {duration: 5000, horizontalPosition: 'center', verticalPosition: 'top'}
        );
      }
    });
  }
}
