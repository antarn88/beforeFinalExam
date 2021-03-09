import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  userList$: BehaviorSubject<User[]> = this.userService.usersList$;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAll();
  }

  onClickEdit(user: User): void {
    this.userService.update(user).subscribe();
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

}
