import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Key } from './key.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-keyborrow',
  templateUrl: './keyborrow.component.html',
  styleUrls: ['./keyborrow.component.css']
})
export class KeyborrowComponent implements OnInit {
  keys: Key[] = [];
  newKeyName = '';
  newRoomName = '';
  borrowedKey: Key | null = null;
  borrowedKeysCount = 0;
  availableKeysCount = 0;

  constructor(private http: HttpClient, private authService: AuthService) {}


  ngOnInit() {
    this.fetchKeys();
  }

  fetchKeys() {
    const userId = this.authService.currentUserSubject.getValue();
    this.http.get<Key[]>(`http://localhost/CICTProject/src/index.php?user_id=${userId}`)
      .subscribe(
        keys => {
          this.keys = keys;
          this.updateKeyCounts();
        },
        error => {
          console.log(error);
        }
      );
  }


  onBorrow(key: Key) {
    key.borrowed = true;
    key.borrowedBy = this.authService.currentUserSubject.getValue(); // set borrower ID to current user ID
    key.borrowedAt = new Date();
    this.updateKeyCounts();

    this.http.put(`https://cmkis.online/backend/index.php?key_id=${key.id}`, key)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
  }


  onReturn(key: Key) {
    const currentUser = this.authService.currentUserSubject.getValue();
    if (key.borrowedBy === currentUser) {
      key.borrowed = false;
      key.borrowedBy = '';
      key.borrowedAt = undefined;
      this.updateKeyCounts();

      this.http.put(`https://cmkis.online/backend/index.php?key_id=${key.id}`, key)
        .subscribe(
          response => {
            console.log(response);
          },
          error => {
            console.log(error);
          }
        );
    } else {
      alert('Only the user who borrowed the key can return it.');
    }
  }


  onViewBorrowedDetails(key: Key) {
    const currentUser = this.authService.currentUserSubject.getValue();
    if (key.borrowedBy === currentUser) {
      this.borrowedKey = key;
    } else {
      console.log('Only the user who borrowed the key can view its details.');
    }
  }


  closeBorrowedDetails() {
    this.borrowedKey = null;
  }

  private updateKeyCounts() {
    this.borrowedKeysCount = this.keys.filter(key => key.borrowed).length;
    this.availableKeysCount = this.keys.length - this.borrowedKeysCount;
  }
}
