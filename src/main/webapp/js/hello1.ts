//https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/dom/AjaxObservable.ts
// const {Observable, Subject, ReplaySubject, from, of, range, fromEvent} = window.rxjs;
// const {tap, map, filter, switchMap, catchError} = window.rxjs.operators;
// const {ajax} = window.rxjs.ajax;

import {rxjs} from "./rxjs.js";
const {Observable, Subject, ReplaySubject, from, of, range, fromEvent} = rxjs;
const {tap, map, filter, switchMap, catchError} = rxjs.operators;

const dog = {
    run: (name: string): string => {
        const array = [1, 2, 3];
        for (let i of array) {
            console.log(`num = ${i}`);
        }
        console.log(`dog run ${name}`);
        console.dir(rxjs);
        return `hello ${name}`;
    }
};

from(fetch(`https://api.github.com/users?per_page=5`)).pipe(
    tap(e => console.log(e)),
    switchMap(response => response.json())
).subscribe(e => console.log(e));

export { dog };