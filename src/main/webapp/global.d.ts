import * as Mustache from 'Mustache';

declare global {
    const Mustache: typeof Mustache;
    const rxjs: any;
}