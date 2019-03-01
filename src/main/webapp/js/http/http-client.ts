import { Observable } from 'oh-my-types';

const { defer, from, of, throwError } = rxjs;
const { switchMap, catchError } = rxjs.operators;

export class HttpClient {

    static get<T>(url, options = {}): Observable<T> {
        options['Authorization'] = `Bearer ${sessionStorage.getItem('access_token')}`;
        const init = {
            method: 'GET',
            headers: options
        };

        return defer(() => fetch(url, init)).pipe(
            switchMap(response => response.ok ? response.json() : from(response.json()).pipe(
                catchError((err) => {
                    console.error(err);
                    return of(null);
                }),
                switchMap(json => throwError({
                    url: response.url,
                    headers: response.headers,
                    status: response.status,
                    statusText: response.statusText,
                    type: response.type,
                    body: json
                })))
            )
        ) as Observable<T>;
    }

    static post<T>(url, body, options = { 'Content-type': 'application/json;charset=UTF-8' }): Observable<T> {
        options['Authorization'] = `Bearer ${sessionStorage.getItem('access_token')}`;
        const init = {
            method: 'POST',
            headers: options,
            body: (typeof body === 'string') ? body : JSON.stringify(body)
        };

        return defer(() => fetch(url, init)).pipe(
            switchMap(response => response.ok ? response.json() : from(response.json()).pipe(
                catchError((err) => {
                    console.error(err);
                    return of(null);
                }),
                switchMap(json => throwError({
                    url: response.url,
                    headers: response.headers,
                    status: response.status,
                    statusText: response.statusText,
                    type: response.type,
                    body: json
                })))
            )
        ) as Observable<T>;
    }

    static put<T>(url, body, options = { 'Content-type': 'application/json;charset=UTF-8' }): Observable<T> {
        options['Authorization'] = `Bearer ${sessionStorage.getItem('access_token')}`;
        const init = {
            method: 'PUT',
            headers: options,
            body: (typeof body === 'string') ? body : JSON.stringify(body)
        };

        return defer(() => fetch(url, init)).pipe(
            switchMap(response => response.ok ? response.json() : from(response.json()).pipe(
                catchError((err) => {
                    console.error(err);
                    return of(null);
                }),
                switchMap(json => throwError({
                    url: response.url,
                    headers: response.headers,
                    status: response.status,
                    statusText: response.statusText,
                    type: response.type,
                    body: json
                })))
            )
        ) as Observable<T>;
    }
}
