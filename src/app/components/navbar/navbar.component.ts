import { Component } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { LoginComponent } from '../login/login.component';
import { LogoutDialogComponent } from '../logout-dialog/logout-dialog.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  datosUser: any = [];
  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    public auth: AngularFireAuth,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserData();
  }

  scrollTo(section: string): void {
    this.router.navigate([], { fragment: section });
    setTimeout(() => {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }

  getUserData() {
    this.userService.getData().subscribe((data) => {
      this.datosUser = [];
      data.forEach((element: any) => {
        this.datosUser.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        });
      });
    });
  }

  openDialog(datos?: any): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '600px',
      data: datos, // pasar datos a través del diálogo si estás en modo de edición
    });
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '400px',
    });
  }

  openLogoutDialog(): void {
    const dialogRef = this.dialog.open(LogoutDialogComponent, {
      width: '450px',
    });
  }
}
