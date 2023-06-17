import { Component } from '@angular/core';
import { map } from 'rxjs';
import { User } from 'src/app/models/items';
import { UserService } from 'src/app/service/user/user.service';
import { CONSTANT_DELAY } from 'src/app/service/utils';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
})
export class InboxComponent {
  constructor(public userService: UserService) {}

  showDeleteModal = false;
  selectedMessageForDeletion: Messages;
  loading = false;
  errorOccurred = false;

  chatUsers: ChatUser[];
  messagesList: Messages[];
  date = new Date();

  currentUser: ChatUser = {
    id: 1,
    name: 'Gaurav',
    message: 'Hello',
    time: new Date(),
  };

  ngOnInit() {
    this.initLoad();
  }

  async initLoad() {
    this.messagesList = [
      {
        id: 0,
        userId: 55262006,
        from: null,
        message: 'Hello',
        time: new Date(),
      },
      {
        id: 1,
        userId: 2099,
        from: null,
        message: 'Kei Chain muzi',
        time: new Date("2023-06-03"),
      },
      {
        id: 2,
        userId: 55262006,
        from: null,
        message: 'How are you?',
        time: new Date("2023-06-01"),
      },
      {
        id: 3,
        userId: 2099,
        from: null,
        message: 'How about you?',
        time: this.minutesTimeAdder(this.date, 6),
      },
      {
        id: 4,
        userId: 2099,
        from: null,
        message: 'I am fine thank you!',
        time: new Date("2023-06-5"),
      },
    ];

    this.messagesList.forEach((message) => {
      this.getUserFromIdController(message.userId).subscribe((data) => {
        message.from = data;
      });
    });

    this.messagesList.sort(function (a, b) {
      var c: any = new Date(a.time);
      var d: any = new Date(b.time);
      return d - c;
    });

    console.log(this.messagesList);
  }

  minutesTimeAdder(originalTime: Date, minutesToAdd: number) {
    let time = structuredClone(originalTime);
    return new Date(time.setMinutes(time.getMinutes() + minutesToAdd));
  }

  handleDelete(id: number) {
    this.loading = true;
    this.errorOccurred = false;

    setTimeout(() => {
      console.log('Deleting ' + this.selectedMessageForDeletion);

      let index = this.messagesList.findIndex((data)=>this.selectedMessageForDeletion.id==data.id)
      this.messagesList.splice(index, 1);
          this.loading = false;
          this.toggleDeleteModal(-1)
          // this.initLoad();


      // this.itemService.deleteItem(this.selectedItemForDeletion.id).subscribe({
      //   next: (data)=> {
      //     this.loading = false;
      //     this.toggleDeleteModal(-1)
      //     this.initLoad();
      //   },error:(msg)=>{
      //     console.log("Error "+msg.error)
      //     this.loading = false;
      //     this.errorOccurred = true;
      //     console.log(this.errorOccurred)
      //     console.log(this.loading)
      //   }
      // });
    }, CONSTANT_DELAY);
  }

  toggleDeleteModal(messageId: number) {
    if (messageId != -1) {
      const item = this.messagesList.find((data) => data.id === messageId);
      this.selectedMessageForDeletion = item;
      console.log(this.selectedMessageForDeletion);
    }
    this.showDeleteModal = !this.showDeleteModal;
  }

  getUserFromIdController(id: number) {
    return this.userService.getUserFromId(id).pipe(
      map((data) => {
        return data;
      })
    );
  }
}

interface ChatUser {
  id: number;
  name: String;
  message: String;
  time: Date;
}

interface Messages {
  id: number;
  userId: number;
  from: User;
  message: String;
  time: Date;
}
