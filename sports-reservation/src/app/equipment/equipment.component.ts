import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EquipmentService } from '../services/equipment.service';

interface Item {
  name: string;
  description: string;
  price: number;
}

@Component({
  selector: 'app-equipment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './equipment.component.html',
})
export class EquipmentComponent implements OnInit {
  items: Item[] = [];
  newItem: Item = { name: '', description: '', price: 0 };
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private equipmentService: EquipmentService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.equipmentService.getEquipment().subscribe(
      (data: any[]) => {
        this.items = data;
        this.errorMessage = null;
      },
      (error) => {
        this.errorMessage = 'Nepodarilo sa načítať zoznam vybavenia.';
        console.error(error);
      }
    );
  }

  addItem(): void {
    this.errorMessage = null;
    this.successMessage = null;

    if (!this.newItem.name) {
      this.errorMessage = 'Názov je povinný.';
      return;
    }

    if (!this.newItem.description) {
      this.errorMessage = 'Popis je povinný.';
      return;
    }

    if (isNaN(this.newItem.price)) {
      this.errorMessage = 'Cena musí byť číslo.';
      return;
    }

    if (this.newItem.price <= 0) {
      this.errorMessage = 'Cena musí byť kladné číslo.';
      return;
    }

    this.equipmentService.addEquipment(this.newItem).subscribe(
      (response) => {
        this.successMessage = 'Vybavenie bolo úspešne pridané!';
        this.loadItems();
        this.newItem = { name: '', description: '', price: 0 };
      },
      (error) => {
        this.errorMessage = 'Nepodarilo sa pridať vybavenie.';
        console.error(error);
      }
    );
  }
}
