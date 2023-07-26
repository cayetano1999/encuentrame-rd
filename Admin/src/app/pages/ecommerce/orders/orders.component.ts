import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})

/**
 * Ecommerce orders component
 */
export class OrdersComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  term: any;

  transactions;

  constructor() { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Administrar' }, { label: 'Reportes', active: true }];

    this.transactions = [
      {
        id: '67',
        name: 'Josue Cayetano',
        date: '24 Jul, 2023',
        total: 'Encontrado en los alrededores del ensanche ozama con heridas de armas...',
        status: 'Paid',
        payment: ['fab fa-cc-mastercard', '122333-23'],
        index: 1,
      },
    ];
  }
}
