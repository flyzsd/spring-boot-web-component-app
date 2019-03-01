import * as Mustache from 'mustache';

declare global {
    const Mustache: typeof Mustache;
    const rxjs: any;
}