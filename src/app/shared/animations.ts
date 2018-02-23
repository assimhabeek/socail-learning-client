import {animate, AnimationMetadata, state, style, transition, trigger} from '@angular/animations';

// Component transition animations
export const slideInLeftAnimation: AnimationMetadata =
  trigger('routeAnimation', [
    state('*',
      style({
        opacity: 1,
        transform: 'translateX(0)',
        width: '100%',
        height: '100%'
      })
    ),
    transition(':enter', [
      style({
        opacity: 0,
        transform: 'translateX(-100%)',
      }),
      animate('0.5s ease-out')
    ]),
    transition(':leave', [
      animate('0.5s ease-out', style({
        opacity: 0,
        transform: 'translateX(100%)'
      }))
    ])
  ]);



