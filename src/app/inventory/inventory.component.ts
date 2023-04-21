import { Component } from '@angular/core';
import { Key } from './key.model';

interface SideBarToggle {
  screenWidth: number;
  collapsed: boolean;}

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

  onAddKey() {
    const newKey = new Key(this.newKeyName, this.newRoomName);
    this.keys.push(newKey);
    this.newKeyName = '';
    this.newRoomName = '';
  }

  onBorrow(key: Key) {
    key.borrowed = true;
    key.borrowedBy = prompt('Enter borrower name:');
    key.borrowedAt = new Date();
  }

  onReturn(key: Key) {
    key.borrowed = false;
    key.borrowedBy = '';
    key.borrowedAt = undefined;;
  }

  onViewBorrowedDetails(key: Key) {
    this.borrowedKey = key;
  }

  closeBorrowedDetails() {
    this.borrowedKey = null;
  }
  onDelete(key: Key) {
    const index = this.keys.indexOf(key);
    if (index !== -1) {
      this.keys.splice(index, 1);
    }
  }

  onToggleSideBar(): void {
    // Add implementation for the method here
  }
}
