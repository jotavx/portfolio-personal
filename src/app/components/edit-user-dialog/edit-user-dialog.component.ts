import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css'],
})
export class EditUserDialogComponent {
  submitted = false;
  id: string | null;
  createUser: FormGroup;
  constructor(
    private userService: UserService,
    private dialogRef: MatDialogRef<EditUserDialogComponent>,
    private fb: FormBuilder,
    private aRoute: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createUser = this.fb.group({
      userImage: ['', Validators.required],
      userName: ['', Validators.required],
      userTitle: ['', Validators.required],
      userDescription: ['', Validators.required],
      userRepository: ['', Validators.required],
      userBackground: [''],
      userLinkedin: [''],
    });
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.forEdit();
  }

  editFinish() {
    this.submitted = true;
    if (this.createUser.invalid) {
      return;
    }
    if (this.data) {
      this.editUser(this.data.id);
      this.closeDialog();
    } else {
      this.closeDialog();
    }
  }

  editUser(id: string) {
    const content: any = {
      userImage: this.createUser.value.userImage,
      userName: this.createUser.value.userName,
      userTitle: this.createUser.value.userTitle,
      userDescription: this.createUser.value.userDescription,
      userRepository: this.createUser.value.userRepository,
      userBackground: this.createUser.value.userBackground,
      userLinkedin: this.createUser.value.userLinkedin,
    };
    this.userService
      .editUser(id, content)
      .then((resp) => {
        console.log(resp);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  forEdit() {
    if (this.data) {
      this.createUser.setValue({
        userImage: this.data.userImage,
        userName: this.data.userName,
        userTitle: this.data.userTitle,
        userDescription: this.data.userDescription,
        userRepository: this.data.userRepository,
        userBackground: this.data.userBackground,
        userLinkedin: this.data.userLinkedin,
      });
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
