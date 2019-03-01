import { HttpClient } from '../http/http-client.js';
import { GithubUser } from '../model/index.js';
import { Observable } from 'oh-my-types';

export class GithubService {

    static getUsers(): Observable<GithubUser[]> {
        const url = `https://api.github.com/users?per_page=5`;
        return HttpClient.get<GithubUser[]>(url);
    }

}