import {Component, Inject} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {HttpClient} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatRow, MatRowDef, MatTable} from "@angular/material/table";
import {ThemeService} from "../../../theme.service";
import {NgClass} from "@angular/common";
import {Game, GameId, GameScore} from "../../../interfaces";

@Component({
  selector: 'app-dialogcontentaddscore',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule,
    MatSelectModule, MatButtonModule,
    MatTooltipModule, MatIconModule,
    MatDatepickerModule, MatNativeDateModule,
    MatDialogModule, MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatRow, MatRowDef, MatTable, NgClass],
  templateUrl: './dialogcontentaddscore.component.html',
  styleUrl: './dialogcontentaddscore.component.scss'
})
export class DialogcontentaddscoreComponent {
  isDarkMode: boolean;

  constructor(private themeService: ThemeService, private formBuilder: FormBuilder, private http: HttpClient, private snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: GameId) {
    this.getGame();
    this.isDarkMode = this.themeService.isDarkMode();
  }

  game: Game[] = [];
  columnsToDisplayGame = ["homeTeamName", "awayTeamName"];

  gameForm = this.formBuilder.group({
    homeScore: new FormControl,
    awayScore: new FormControl
  })

  /**
   * Retrieves the game details.
   */
  getGame() {
    const gameId = {
      params: {"gameId": this.data.gameId}
    }
    this.http.get<Game[]>('/api/general/game', gameId).subscribe(
      data => {
        console.log(data);
        this.game = data;
      }
    )
  }

  /**
   * Saves the new score for the game.
   */

  save() {
    if (!this.gameForm.valid) {
      return;
    }
    let gameData: GameScore = {
      id: this.data.gameId,
      homeScore: this.gameForm.value.homeScore,
      awayScore: this.gameForm.value.awayScore
    }
    this.http.post<GameScore>('/api/admin/newscore', gameData).subscribe({
      next: (response) => console.log(response),
      error: (error) => {
        (this.snackBar).open(
          "New score failed", 'Close', {duration: 10000, horizontalPosition: 'center', verticalPosition: 'top'}
        );
      },
      complete: () => {
        (this.snackBar).open(
          "New score added", "Close", {duration: 5000, horizontalPosition: 'center', verticalPosition: 'top'}
        );
      }
    });
  }
}
