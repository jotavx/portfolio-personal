import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { HomeService } from 'src/services/home.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-content-dialog',
  templateUrl: './create-content-dialog.component.html',
  styleUrls: ['./create-content-dialog.component.css'],
})
export class CreateContentDialogComponent implements OnInit {
  submitted = false;
  createContent: FormGroup;
  id: string | null;
  constructor(
    private dialogRef: MatDialogRef<CreateContentDialogComponent>,
    private homeService: HomeService,
    private fb: FormBuilder,
    private aRoute: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createContent = this.fb.group({
      dynamicTitle: ['', Validators.required],
      dynamicUrl: ['', Validators.required],
      dynamicDescription: ['', Validators.required],
      dynamicImage: ['', Validators.required],
    });
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.forEdit();
  }

  buildContent() {
    const content = this.createContent.value;
    this.homeService
      .buildContent(content)
      .then(() => {
        console.log('El registro se completo correctamente');
        this.dialogRef.close();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  editContent(id: string) {
    const content: any = {
      dynamicTitle: this.createContent.value.dynamicTitle,
      dynamicUrl: this.createContent.value.dynamicUrl,
      dynamicDescription: this.createContent.value.dynamicDescription,
      dynamicImage: this.createContent.value.dynamicImage,
    };
    this.homeService
      .editContent(id, content)
      .then((resp) => {
        console.log(resp);
        this.dialogRef.close();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  buildOrEditContent() {
    this.submitted = true;
    if (this.createContent.invalid) {
      return;
    }

    if (this.data) {
      this.editContent(this.data.id);
    } else {
      this.buildContent();
    }
  }

  forEdit() {
    if (this.data) {
      this.createContent.setValue({
        dynamicTitle: this.data.dynamicTitle,
        dynamicUrl: this.data.dynamicUrl,
        dynamicDescription: this.data.dynamicDescription,
        dynamicImage: this.data.dynamicImage,
      });
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
