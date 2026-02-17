// src/app/member/trainers/trainer.component.ts
import { Component, OnInit } from '@angular/core';
import { TrainersService, Trainer } from '../services/trainers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.css']
})
export class TrainersComponent implements OnInit {
  trainers: Trainer[] = [];

  constructor(
    private trainerService: TrainersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.trainerService.getAllTrainers().subscribe({
      next: (data) => {
        this.trainers = data;
      },
      error: (err) => {
        console.error('Trainer list fetch error:', err);
      }
    });
  }

  goToProfile(id: number): void {
    this.router.navigate(['/member/trainers', id]);
  }
}

