import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: AngularFirestore, private auth: Auth) {}

  getData(): Observable<any> {
    return this.firestore.collection('user').snapshotChanges();
  }

  editUser(id: string, data: any): Promise<any> {
    return this.firestore.collection('user').doc(id).update(data);
  }

  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }
}
