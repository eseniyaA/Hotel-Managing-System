import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { Breakfast, Description, Position, Staff, Tour } from '../../../shared/interfaces';

@Component({
  selector: 'app-admin-manage',
  templateUrl: './admin-manage.component.html',
  styleUrls: ['./admin-manage.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminManageComponent implements OnInit {
  staff: Staff[] = [];
  positions: Position[] = [];
  breakfasts: Breakfast[] = [];
  tours: Tour[] = [];
  description$ = this.httpClient.get<Description[]>(`/api/description`);

  showCreateForm = false;
  showCreateBreakfastForm = false;
  showCreateTourForm = false;

  form = this.fb.group({
    position: new FormControl('', Validators.required),
    salary: new FormControl('', Validators.required),
  });

  createForm = this.fb.group({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    position: new FormControl('', Validators.required),
  });

  descriptionForm = this.fb.group({
    description: ['', Validators.required],
  });

  breakfastForm = this.fb.group({
    menu: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
  });

  createBreakfastForm = this.fb.group({
    menu: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
  });

  tourForm = this.fb.group({
    title: new FormControl('', Validators.required),
    commonAmount: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
  });

  createTourForm = this.fb.group({
    title: new FormControl('', Validators.required),
    commonAmount: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
  });

  constructor(
    private httpClient: HttpClient,
    private fb: FormBuilder,
    private cRef: ChangeDetectorRef,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    const positions$ = this.httpClient.get<Position[]>(`/api/positions`);
    const staff$ = this.httpClient.get<Staff[]>(`/api/staff`);

    forkJoin([positions$, staff$]).subscribe(([positions, staff]: [Position[], Staff[]]) => {
      this.staff = this.formatStaff([positions, staff]);
      this.positions = positions;
      this.cRef.detectChanges();
    });

    this.httpClient.get<Breakfast[]>(`/api/breakfasts`).subscribe((response) => (this.breakfasts = response));
    this.httpClient.get<Tour[]>(`/api/tours`).subscribe((response) => (this.tours = response));
  }

  private formatStaff([positions, staff]: [Position[], Staff[]]) {
    staff.forEach((staff) => {
      staff.position = positions.find((position) => position.id === staff.positionId)?.name;
    });
    return staff;
  }

  updateSalary(person: Staff) {
    this.form.patchValue({ salary: person.salary });

    console.log('valid');
    this.httpClient
      .patch<Staff>(`/api/staff`, {
        ...person,
        salary: this.form.value.salary,
      })
      .subscribe((response) => {
        person = response;

        const newPerson = this.staff.find((staff) => staff.id == person.id);
        if (newPerson) {
          newPerson.salary = person.salary;
        }
        console.log(person);
        console.log(newPerson);
        this.cRef.detectChanges();
      });
  }

  updatePosition(person: Staff) {
    this.httpClient
      .patch<Staff>(`/api/staff`, {
        ...person,
        positionId: this.form.value.position.id,
      })
      .subscribe((response) => {
        person = response;
        person.position = this.positions.find((position) => position.id === person.positionId)?.name;

        const newPerson = this.staff.find((staff) => staff.id == person.id);
        if (newPerson) {
          newPerson.position = person.position;
        }

        this.cRef.detectChanges();
      });
  }

  addNewStaff() {
    if (this.createForm.valid) {
      this.httpClient
        .post(`/api/staff`, {
          firstName: this.createForm.value.firstName,
          lastName: this.createForm.value.lastName,
          positionId: this.createForm.value.position.id,
          salary: this.createForm.value.position.basicSalary,
        })
        .subscribe((response) => {
          this.showCreateForm = false;
          this.createForm.value.clear;
          this.staff.push(response as Staff);
          this.formatStaff([this.positions, this.staff]);
          this.cRef.detectChanges();
        });
    }
  }

  showCreate() {
    this.showCreateForm = true;
  }

  submitDescription() {
    if (this.descriptionForm.valid) {
      this.httpClient
        .patch(`/api/administration`, {
          description: this.descriptionForm.value.description,
        })
        .subscribe((response) => {
          this.cRef.detectChanges();
        });
    }
  }

  deleteStaff(person: Staff) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.httpClient
          .delete<boolean>(`/api/staff`, {
            body: {
              id: person.id,
            },
          })
          .subscribe((response) => {
            if (response) {
              const index = this.staff.indexOf(person);
              this.staff.splice(index, 1);
              this.cRef.detectChanges();
            }
          });
      },
    });
  }

  updateMenu(breakfast: Breakfast) {
    if (this.breakfastForm.valid) {
      this.httpClient
        .patch<Breakfast>(`/api/breakfast`, {
          ...breakfast,
          menu: this.breakfastForm.value.menu,
        })
        .subscribe((response) => {
          breakfast = response;

          this.cRef.detectChanges();
        });
    }
  }

  updatePrice(breakfast: Breakfast) {
    if (this.breakfastForm.valid) {
      this.httpClient
        .patch<Breakfast>(`/api/breakfast`, {
          ...breakfast,
          price: this.breakfastForm.value.price,
        })
        .subscribe((response) => {
          breakfast = response;

          this.cRef.detectChanges();
        });
    }
  }

  deleteBreakfast(breakfast: Breakfast) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.httpClient
          .delete<boolean>(`/api/breakfast`, {
            body: {
              id: breakfast.id,
            },
          })
          .subscribe((response) => {
            if (response) {
              const index = this.breakfasts.indexOf(breakfast);
              this.breakfasts.splice(index, 1);
              this.cRef.detectChanges();
            }
          });
      },
    });
  }

  addNewBreakfast() {
    if (this.createBreakfastForm.valid) {
      this.httpClient
        .post(`/api/breakfasts`, {
          menu: this.createBreakfastForm.value.menu,
          price: this.createBreakfastForm.value.price,
        })
        .subscribe((response) => {
          this.showCreateBreakfastForm = false;
          this.createBreakfastForm.value.clear;
          this.breakfasts.push(response as Breakfast);
          this.cRef.detectChanges();
        });
    }
  }

  updateTour(tour: Tour, control: FormControl) {
    if (!tour.title || !tour.commonAmount || !tour.price || !tour.description) return;
    this.httpClient
      .patch<Tour>(`/api/tour`, {
        id: tour.id,
        title: tour.title,
        commonAmount: tour.commonAmount,
        amountOfGuests: tour.amountOfGuests,
        description: tour.description,
        price: tour.price,
      })
      .subscribe((response) => {
        tour = response;

        this.cRef.detectChanges();
      });
  }

  addNewTour() {
    if (this.createTourForm.valid) {
      this.httpClient
        .post(`/api/tours`, {
          title: this.createTourForm.value.title,
          commonAmount: this.createTourForm.value.commonAmount,
          amountOfGuests: 0,
          description: this.createTourForm.value.description,
          price: this.createTourForm.value.price,
        })
        .subscribe((response) => {
          this.showCreateTourForm = false;
          this.createTourForm.value.clear;
          this.tours.push(response as Tour);
          this.cRef.detectChanges();
        });
    }
  }

  deleteTour(tour: Tour) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.httpClient
          .delete<boolean>(`/api/tour`, {
            body: {
              id: tour.id,
            },
          })
          .subscribe((response) => {
            if (response) {
              const index = this.tours.indexOf(tour);
              this.tours.splice(index, 1);
              this.cRef.detectChanges();
            }
          });
      },
    });
  }
}
