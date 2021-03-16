import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.scss']
})
export class UserListingComponent implements OnInit {

  userList$: BehaviorSubject<User[]> = this.userService.usersList$;
  phrase: string = '';
  sorterColumn: string = 'id';
  sorterDirection: string = 'ASC';
  firstSorting: boolean = true;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAll();
  }

  onClickEdit(user: User): void {
    if (user.name === '' || user.username === '' || user.email === '') {
      alert('Fill the all data of user!');
    } else {
      this.userService.update(user).subscribe();
    }
  }

  onClickDelete(id: number): void {
    this.userService.remove(id).subscribe(
      () => this.userService.getAll(),
    );
  }

  onClickCreate(): void {
    const name = (document.querySelector('#name') as HTMLInputElement);
    const username = (document.querySelector('#username') as HTMLInputElement);
    const email = (document.querySelector('#email') as HTMLInputElement);
    const active = (document.querySelector('#active') as HTMLInputElement);

    if (name.value === '' || username.value === '' || email.value === '') {
      alert('None of the fields can be empty!');
    } else {
      const newUser = { name: name.value, username: username.value, email: email.value, active: active.checked };
      this.userService.create(newUser).subscribe(
        () => {
          name.value = '';
          username.value = '';
          email.value = '';
          active.checked = false;
          this.userService.getAll();
        }
      );
    }
  }

  onChangePhrase(event: Event): void {
    this.phrase = (event.target as HTMLInputElement).value;
  }

  onClickTableHeader(column: string): void {
    if (this.firstSorting) {
      this.sorterDirection = column === 'id' ? 'DESC' : 'ASC';
      this.firstSorting = false;
    } else this.sorterDirection = this.sorterDirection === 'ASC' ? 'DESC' : 'ASC';
    this.sorterColumn = column;
  }

}
