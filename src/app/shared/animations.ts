import {
  animate, AnimationMetadata, keyframes, query, stagger, state, style, transition,
  trigger
} from '@angular/animations';

export const routerAnimation: AnimationMetadata =
  trigger('routeAnimation', [
    state('*',
      style({
        opacity: 1,
        transform: 'translateX(0)',
        width: '100%'
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

export const slideSideNav: AnimationMetadata =
  trigger('slideSideNav', [
    state('*',
      style({
        opacity: 1,
        transform: 'translateX(0)'
      })
    ),
    transition(':enter', [
      style({
        opacity: 1,
        transform: 'translateX(-36px)'
      }),
      animate('0.2s ease-out')
    ]),
    transition(':leave', [
      animate('0.02s ease-out', style({
        opacity: 1,
        transform: 'translateX(-36px)'
      }))
    ])
  ]);



export const fadeAnimation: AnimationMetadata =
  trigger('fadeAnimation', [
    state('*',
      style({
        opacity: 1
      })
    ),
    transition(':enter', [
      style({
        opacity: 0
      }),
      animate('0.6s ease-in-out')
    ]),
    transition(':leave', [
      animate('0.6s ease-in-out', style({
        opacity: 0
      }))
    ])
  ]);


export const slideAnimation: AnimationMetadata =
  trigger('slide', [
    state('*',
      style({
        height: 0,
        opacity: 0
      })
    ),
    state('true',
      style({
        height: '*',
        opacity: 1
      })
    ),
    transition('* => *', animate(300))
  ]);


export const fadeListItems: AnimationMetadata =
  trigger('listAnimation', [
    transition('* => *', [ // each time the binding value changes
      query(':enter', [
        style({ opacity: 0, transform: 'translateX(-20%)' }),
        stagger(100, [
          animate('0.3s', style({ opacity: 1, transform: 'translateX(0)' }))
        ])
      ], { optional: true })
    ])
  ]);

export const fadeChat: AnimationMetadata =
  trigger('fadeChat', [
    transition('* => *', [ // each time the binding value changes
      query(':enter', [
        style({ opacity: 0, transform: 'scale(0)' }),
        stagger(100, [
          animate('0.4s', style({ opacity: 1, transform: 'scale(1)' }))
        ])
      ], { optional: true })
    ])
  ]);

export const debounce: AnimationMetadata =
  trigger('debounce', [
    state('in', style({ transform: 'translateX(0)' })),
    transition('* => *', [
      animate(400, keyframes([
        style({ transform: 'translateX(-15%)', offset: 0 }),
        style({ transform: 'translateX(15%)', offset: 0.4 }),
        style({ transform: 'translateX(-15%)', offset: 0.8 }),
        style({ transform: 'translateX(0%)', offset: 1 })
      ]))
    ])
  ]);

