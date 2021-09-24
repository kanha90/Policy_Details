import { Component, createPlatform, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';

import { PolicyServiceService } from '../Service/policy-service.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-policy-details',
  templateUrl: './policy-details.component.html',
  styleUrls: ['./policy-details.component.css'],
})
export class PolicyDetailsComponent implements OnInit {
  widgetsContent: any;
  constructor(
    private getPolicy: PolicyServiceService,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  policy: any;
  public page: number = 1;

  public length!: number;

  itemsPerPage!: number;
  pid: any;
  myform: FormGroup | any;
  element: any;
  Policy_id: any;
  Date_of_Purchase: any;
  Customer_id: any;
  Fuel: any;
  VEHICLE_SEGMENT: any;
  Premium: any;
  bodily_injury_liability: any;
  personal_injury_protection: any;
  property_damage_liability: any;
  collision: any;
  comprehensive: any;
  Customer_Gender: any;
  Customer_Income_group: any;
  Customer_Region: any;
  Customer_Marital_status: any;

  ngOnInit(): void {
    this.createform();

    this.getAllPolicyDetails();
  }

  createform() {
    this.myform = new FormGroup({
      Policy_id: new FormControl(null, [Validators.required]),
      Date_of_Purchase: new FormControl(null, [Validators.required]),
      Customer_id: new FormControl(null, [Validators.required]),
      Fuel: new FormControl(null, [Validators.required]),
      VEHICLE_SEGMENT: new FormControl(null, [Validators.required]),
      Premium: new FormControl(null, [Validators.required]),
      bodily_injury_liability: new FormControl(null, [Validators.required]),
      personal_injury_protection: new FormControl(null, [Validators.required]),
      property_damage_liability: new FormControl(null, [Validators.required]),
      collision: new FormControl(null, [Validators.required]),
      comprehensive: new FormControl(null, [Validators.required]),
      Customer_Gender: new FormControl(null, [Validators.required]),
      Customer_Income_group: new FormControl(null, [Validators.required]),
      Customer_Region: new FormControl(null, [Validators.required]),
      Customer_Marital_status: new FormControl(null, [Validators.required]),
    });
  }

  getAllPolicyDetails() {
    this.getPolicy.getAllpolicy().subscribe({
      next: (res) => {
        console.log(res.count);
        this.policy = res.policy;
        console.log(this.policy);
      },
    });
  }

  open(content: any, pol: any) {
    console.log(pol);
    console.log(pol.Policy_id);

    this.Policy_id = pol.Policy_id;
    this.Date_of_Purchase = pol.Date_of_Purchase;
    this.Customer_id = pol.Customer_id;
    this.Fuel = pol.Fuel;
    this.VEHICLE_SEGMENT = pol.VEHICLE_SEGMENT;
    this.Premium = pol.Premium;
    this.bodily_injury_liability = pol.bodily_injury_liability;
    this.personal_injury_protection = pol.personal_injury_protection;
    this.property_damage_liability = pol.property_damage_liability;
    this.collision = pol.collision;
    this.comprehensive = pol.comprehensive;
    this.Customer_Gender = pol.Customer_Gender;
    this.Customer_Income_group = pol.Customer_Income_group;
    this.Customer_Region = pol.Customer_Region;
    this.Customer_Marital_status = pol.Customer_Marital_status;

    this.modalService.open(content);
  }
  //  data get by policy_id
  SearchById(id: string) {
    this.getPolicy.getPolicyByPolicyId(id).subscribe({
      next: (res) => {
        console.log(JSON.stringify(res.policy));

        this.policy = [];
        this.policy.push(res.policy);
      },
    });
  }

  // get policy by customerId

  SearchByCId(id: string) {
    console.log(id);

    this.getPolicy.getPolicyByCustomerId(id).subscribe({
      next: (res) => {
        console.log(JSON.stringify(res.policy));
        this.policy = res.policy;
      },
    });
  }

  //  data update by policy_id

  updateById() {
    let payload = {
      Policy_id: this.Policy_id,
      Date_of_Purchase: this.Date_of_Purchase,
      Customer_id: this.Customer_id,
      Fuel: this.Fuel,
      VEHICLE_SEGMENT: this.VEHICLE_SEGMENT,
      Premium: this.Premium,
      bodily_injury_liability: this.bodily_injury_liability,
      personal_injury_protection: this.personal_injury_protection,
      property_damage_liability: this.property_damage_liability,
      collision: this.collision,
      comprehensive: this.comprehensive,
      Customer_Gender: this.Customer_Gender,
      Customer_Income_group: this.Customer_Income_group,
      Customer_Region: this.Customer_Region,
      Customer_Marital_status: this.Customer_Marital_status,
    };

    console.log(payload.Policy_id);
    if(payload.Premium>=10000){

      Swal.fire('Premium is more then 100000 ')
      
      this.scrollLeft()

    }
    else{
      this.getPolicy.updatePolicyByPolicyId(payload).subscribe({
        next: (res) => {
          // console.log(JSON.stringify(res.policy));
          this.getAllPolicyDetails();
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Premium is updated !',
            html: 'I will updeated data in <b></b> milliseconds.',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,

          })


        },

      });
    }

  }
  onActivate(event : any) {
    window.scroll(0,0);

}

  search() {
    this.getAllPolicyDetails();
  }

  scrollLeft(){
    this.widgetsContent.nativeElement.scrollLeft -= 150;
  }
}


