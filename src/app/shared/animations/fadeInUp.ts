import { trigger, state, animate, transition, style, keyframes } from '@angular/animations';

export const fadeInUp = trigger('fadeInUp', [
  transition('void => *', [
    animate(
      500,
      keyframes([
        style({
          opacity: 0,
          transform: 'translate3d(0, 100%, 0)',
          offset: 0
        }),
        style({
          opacity: 0,
          transform: 'translate3d(0, 80%, 0)',
          offset: 0.5
        }),
        style({
          opacity: 1,
          transform: 'none',
          offset: 1
        })
      ])
    )
  ]),
  transition('* => void', [
    animate(
      500,
      keyframes([
        style({
          opacity: 1,
          transform: 'translate3d(0, 0%, 0)',
          offset: 0
        }),
        style({
          opacity: 1,
          transform: 'translate3d(0, 80%, 0)',
          offset: 0.5
        }),
        style({
          opacity: 0,
          transform: 'translate3d(0, 100%, 0)',
          offset: 1
        })
      ])
    )
  ])
]);

export const flyIn = trigger('flyIn', [
  transition('void => *', [
    animate(
      3000,
      keyframes([
        style({ opacity: 0, transform: 'translateX(-100%)', offset: 0 }),
        style({ opacity: 1, transform: 'translateX(25px)', offset: 0.5 }),
        style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 })
      ])
    )
  ]),
  transition('* => void', [
    animate(
      3000,
      keyframes([
        style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
        style({ opacity: 1, transform: 'translateX(25px)', offset: 0.5 }),
        style({ opacity: 0, transform: 'translateX(100%)', offset: 1 })
      ])
    )
  ])
]);
