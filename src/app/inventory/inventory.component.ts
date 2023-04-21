import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Key } from './key.model';

interface SideBarToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent {
  keys: Key[] = [];
  newKeyName: string = '';
  newRoomName: string = '';
  borrowedKey: Key | null = null;
  borrowedKeysCount: number = 0;
  availableKeysCount: number = 0;

  constructor(private http: HttpClient) {}

  onAddKey() {
    const newKey = new Key(this.newKeyName, this.newRoomName);
    this.keys.push(newKey);
    this.newKeyName = '';
    this.newRoomName = '';
    this.availableKeysCount++;
  }

  onBorrow(key: Key) {
    key.borrowed = true;
    key.borrowedBy = prompt('Enter borrower name:');
    key.borrowedAt = new Date();
    this.borrowedKeysCount++;
    this.availableKeysCount--;
  }

  onReturn(key: Key) {
    key.borrowed = false;
    key.borrowedBy = '';
    key.borrowedAt = undefined;
    this.borrowedKeysCount--;
    this.availableKeysCount++;
  }

  onDelete(key: Key) {
    const index = this.keys.indexOf(key);
    if (index > -1) {
      this.keys.splice(index, 1);
      if (key.borrowed) {
        this.borrowedKeysCount--;
      } else {
        this.availableKeysCount--;
      }
    }
  }

  onViewBorrowedDetails(key: Key) {
    this.borrowedKey = key;
  }

  closeBorrowedDetails() {
    this.borrowedKey = null;
  }

  onToggleSideBar(): void {
    this.http.get<Key[]>('http://localhost/index.php')
      .subscribe(keys => {
        this.keys = keys;
      });
  }
}
