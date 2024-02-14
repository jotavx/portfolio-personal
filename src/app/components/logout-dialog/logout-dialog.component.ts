import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrls: ['./logout-dialog.component.css'],
})
export class LogoutDialogComponent {
  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<LogoutDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick() {
    this.userService
      .logout()
      .then(() => {
        this.dialogRef.close();
      })
      .catch((error) => console.log(error));
  }
}
