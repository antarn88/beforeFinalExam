import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  serverAddress: string = 'http://localhost:3000/users';

  usersList$: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  constructor(private http: HttpClient) { }

  getAll(): void {
    this.usersList$.next([]);
    this.http.get<User[]>(this.serverAddress).subscribe(
      usersList => this.usersList$.next(usersList),
      error => console.error(error)
    );
  }

  get(id: number): Observable<User> {
    return this.http.get<User>(`${this.serverAddress}/${id}`);
  }

  update(user: User): Observable<User> {
    return this.http.patch<User>(`${this.serverAddress}/${user.id}`, user);
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(this.serverAddress, user);
  }

  remove(id: number): Observable<User> {
    return this.http.delete<User>(`${this.serverAddress}/${id}`);
  }

}
