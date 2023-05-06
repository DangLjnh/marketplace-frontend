import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/pages/auth/data-access/auth.service';
import { IAddressResponse, IUser } from 'src/app/shared/model/interface';
import { CustomerService } from '../../data-access/customer.service';
import { CustomerAddressModalComponent } from '../customer-address-modal/customer-address-modal.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-address',
  templateUrl: './customer-address.component.html',
  styleUrls: ['./customer-address.component.scss'],
})
export class CustomerAddressComponent implements OnInit {
  listAddress!: IAddressResponse[];
  dataUser!: IUser;

  handleChangeDefaultAddress(addressID: number | undefined) {
    this.customerService.updateDefaultAddress(addressID).subscribe(() => {
      this.customerService
        .readAddressOfUser(this.dataUser?.id)
        .subscribe((data) => {
          this.customerService.listAddress = data.DT;
        });
    });
  }

  handleDeleteAddress(addressID: number | undefined) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0A68FF',
      cancelButtonColor: '#FF424E',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Deleted!',
          text: 'Your address has been deleted.',
          icon: 'success',
          confirmButtonColor: '#0A68FF', // Update the button color
        });
        this.customerService.deleteAddress(addressID).subscribe(() => {
          this.customerService
            .readAddressOfUser(this.dataUser?.id)
            .subscribe((data) => {
              this.customerService.listAddress = data.DT;
            });
        });
      }
    });
  }

  openModalCreateAddress() {
    this.dialog.open(CustomerAddressModalComponent, {
      data: {
        type: 'create',
      },
    });
  }

  openModalEditAddress(addressID: number | undefined) {
    this.dialog.open(CustomerAddressModalComponent, {
      data: {
        type: 'edit',
        addressID: addressID,
      },
    });
  }

  defaultAddressToTop(listAddress: IAddressResponse[]): IAddressResponse[] {
    const listAddressDefault = [...listAddress].filter(
      (data) => data.isDefault === true
    );
    const listAddressNotDefault = [...listAddress].filter(
      (data) => data.isDefault === false
    );
    return [...listAddressDefault, ...listAddressNotDefault];
  }

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private customerService: CustomerService
  ) {}
  ngOnInit(): void {
    this.customerService.listAddress$.subscribe((data) => {
      if (data) {
        this.listAddress = this.defaultAddressToTop(data);
      } else {
        this.authService.dataUser$.subscribe((data) => {
          this.dataUser = data;
          this.customerService.readAddressOfUser(data?.id).subscribe((data) => {
            this.listAddress = this.defaultAddressToTop(data.DT);
          });
        });
      }
    });
  }
}
