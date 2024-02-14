import { Component } from '@angular/core';
import { HomeService } from 'src/services/home.service';
import { UserService } from 'src/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateContentDialogComponent } from '../create-content-dialog/create-content-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  userLinkedin: string = '';
  submitted = false;
  datosUser: any = [];
  datosHome: any = [];
  constructor(
    private homeService: HomeService,
    private userService: UserService,
    public dialog: MatDialog,
    public auth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.getContentData();
    this.getUserData();
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
      if (this.datosUser.length > 0) {
        this.userLinkedin = this.datosUser[0].userLinkedin || '';
        console.log('LinkedIn URL:', this.userLinkedin);
      }
    });
  }

  getContentData() {
    this.homeService.getData().subscribe((data) => {
      this.datosHome = [];
      data.forEach((element: any) => {
        this.datosHome.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        });
      });
    });
  }

  deleteContent(id: string): void {
    this.homeService
      .deleteContent(id)
      .then(() => {
        console.log('El elemento se eliminó correctamente');
        this.getContentData();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  openDialog(content?: any): void {
    const dialogRef = this.dialog.open(CreateContentDialogComponent, {
      width: '900px',
      data: content, // pasar datos a través del diálogo si estás en modo de edición
    });
  }

  openDeleteDialog(id: string): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '450px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.deleteContent(id);
      }
    });
  }
}
