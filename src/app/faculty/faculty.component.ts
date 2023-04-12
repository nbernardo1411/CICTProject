import { Component } from '@angular/core';

interface SideBarToggle {
  screenWidth: number;
  collapsed: boolean;
}

interface Faculty {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent {
  id: number | undefined;
  name: string | undefined;
  email: string | undefined;
  isSideBarCollapsed = false;
  screenWidth = 0;
  onToggleSideBar(): void {
    // Add implementation for the method here
  }
  editingFaculty: Faculty | null = null; // property to keep track of the faculty being edited

  facultyList: Faculty[] = [

  ];

  addFaculty() {
    const newFaculty: Faculty = {
      id: 0,
      name: '',
      email: ''
    };
    this.editingFaculty = newFaculty;
    this.facultyList.push(newFaculty);
  }

  editFaculty(faculty: Faculty) {
    this.editingFaculty = faculty; // set the faculty being edited
    this.id = faculty.id;
    this.name = faculty.name;
    this.email = faculty.email;
  }

  saveFaculty() {
    if (this.editingFaculty) {
      // update the faculty being edited with the new values
      this.editingFaculty.id = this.id!;
      this.editingFaculty.name = this.name!;
      this.editingFaculty.email = this.email!;
      this.editingFaculty = null; // reset the editing faculty
      this.id = undefined;
      this.name = undefined;
      this.email = undefined;
    }
  }

  cancelEdit() {
    this.editingFaculty = null; // reset the editing faculty
    this.id = undefined;
    this.name = undefined;
    this.email = undefined;
  }

  deleteFaculty(faculty: Faculty) {
    const index = this.facultyList.indexOf(faculty);
    if (index !== -1) {
      this.facultyList.splice(index, 1);
    }
  }
}
