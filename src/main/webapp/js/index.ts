//https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/dom/AjaxObservable.ts
import { rxjs } from "../rxjs/rxjs.js";

const { Observable, Subject, ReplaySubject, from, of, range, fromEvent } = rxjs;
const { tap, map, filter, switchMap, catchError } = rxjs.operators;
const { ajax } = rxjs.ajax;

// import {zoo} from './lib2.ts';
import { zoo } from './hello2.js';

console.dir(rxjs);

from(fetch(`https://api.github.com/users?per_page=5`)).pipe(
    tap(e => console.log(e)),
    switchMap(response => response.json())
).subscribe(e => console.log(e));

zoo.show();