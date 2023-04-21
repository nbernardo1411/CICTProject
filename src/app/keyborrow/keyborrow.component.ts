import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Key } from './key.model';

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

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchKeys();
  }

  fetchKeys() {
    this.http.get<Key[]>('http://localhost/CICTProject/src/index.php')
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
    key.borrowedBy = prompt('Enter borrower name:');
    key.borrowedAt = new Date();
    this.updateKeyCounts();

    this.http.put(`http://localhost/CICTProject/src/index.php?key_id=${key.id}`, key)
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
    key.borrowed = false;
    key.borrowedBy = '';
    key.borrowedAt = undefined;
    this.updateKeyCounts();

    this.http.put(`http://localhost/CICTProject/src/index.php?key_id=${key.id}`, key)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
  }
  onViewBorrowedDetails(key: Key) {
    this.borrowedKey = key;
  }

  closeBorrowedDetails() {
    this.borrowedKey = null;
  }

  private updateKeyCounts() {
    this.borrowedKeysCount = this.keys.filter(key => key.borrowed).length;
    this.availableKeysCount = this.keys.length - this.borrowedKeysCount;
  }
}
