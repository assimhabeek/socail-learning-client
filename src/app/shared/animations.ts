import {
  animate, AnimationMetadata, keyframes, query, stagger, state, style, transition,
  trigger
} from '@angular/animations';

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
      animate('0.3s ease-out')
    ]),
    transition(':leave', [
      animate('0.5s ease-out', style({
        opacity: 0,
        transform: 'translateX(100%)'
      }))
    ])
  ]);

export const fadeListItems: AnimationMetadata =
  trigger('listAnimation', [
    transition('* => *', [ // each time the binding value changes
      query(':enter', [
        style({opacity: 0, transform: 'translateX(-20%)'}),
        stagger(100, [
          animate('0.3s', style({opacity: 1, transform: 'translateX(0)'}))
        ])
      ], {optional: true})
    ])
  ]);

export const debounce: AnimationMetadata =
  trigger('debounce', [
    state('in', style({transform: 'translateX(0)'})),
    transition('* => *', [
      animate(400, keyframes([
        style({transform: 'translateX(-15%)', offset: 0}),
        style({transform: 'translateX(15%)', offset: 0.4}),
        style({transform: 'translateX(-15%)', offset: 0.8}),
        style({transform: 'translateX(0%)', offset: 1})
      ]))
    ])
  ]);

