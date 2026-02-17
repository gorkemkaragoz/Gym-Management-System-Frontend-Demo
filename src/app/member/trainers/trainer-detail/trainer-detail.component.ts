// src/app/member/trainers/trainer-detail/trainer-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrainersService, Trainer } from '../../services/trainers.service';

@Component({
  selector: 'app-trainer-detail',
  templateUrl: './trainer-detail.component.html',
  styleUrls: ['./trainer-detail.component.css']
})
export class TrainerDetailComponent implements OnInit {
  trainer: Trainer | null = null;

  constructor(
    private route: ActivatedRoute,
    private trainerService: TrainersService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.trainerService.getAllTrainers().subscribe({
      next: (data) => {
        this.trainer = data.find(t => t.id === id) || null;
      },
      error: (err) => {
        console.error('Trainer fetch failed:', err);
      }
    });
  }
}

