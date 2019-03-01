// https://github.com/ReactiveX/rxjs/blob/master/src/internal/observable/dom/AjaxObservable.ts

import { GithubService } from './services/github-service.js';

const { Observable, Subject, ReplaySubject, from, of, range, fromEvent } = rxjs;
const { tap, map, filter, switchMap, catchError } = rxjs.operators;
const { ajax } = rxjs.ajax;

import { zoo } from './hello2.js';

GithubService.getUsers().pipe(
    tap(e => console.log(e))
).subscribe(e => console.log(e));

zoo.show();
