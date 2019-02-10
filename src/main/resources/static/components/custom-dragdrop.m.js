import './dragdrop-input.m.js';
import './dragdrop-output.m.js';

const {Observable, Subject, ReplaySubject, from, of, range, fromEvent} = rxjs;
const {tap, map, filter, switchMap, takeUntil, catchError} = rxjs.operators;

const template = document.createElement('template');
template.innerHTML = `
    <style>
        :host {
            all: initial;       /* 1st rule so subsequent properties are reset. */
            display: block;     /* by default, custom elements are display: inline */
            contain: content;   /* CSS containment */
        }

        :host([hidden]) { 
            display: none 
        }
    </style>
    <dragdrop-input></dragdrop-input>
    <dragdrop-output></dragdrop-output>
`;

class CustomDragdrop extends HTMLElement {
    constructor() {
        super();
        // Attach a shadow root to the element.
        this.attachShadow({mode: 'open'}).appendChild(template.content.cloneNode(true));
    }

    // Called every time the element is inserted into the DOM. Useful for running setup code, such as fetching resources or rendering. Generally, you should try to delay work until this time.
    connectedCallback() {
        console.log('connectedCallback');
        console.dir(this);
        this.disconnected$ = new Subject();
        fromEvent(this.shadowRoot.querySelector('dragdrop-input'), 'image').pipe(
            tap(e => e.preventDefault()),
            map(e => e.detail),
            takeUntil(this.disconnected$)
        ).subscribe(
            detail => this.shadowRoot.querySelector('dragdrop-output').image = detail
        );
    }

    // Called every time the element is removed from the DOM. Useful for running clean up code.
    disconnectedCallback() {
        this.disconnected$.next(true);
        this.disconnected$.complete();
    }
}

window.customElements.whenDefined('custom-dragdrop').then(() => {
    console.log('custom-dragdrop defined');
});

customElements.define('custom-dragdrop', CustomDragdrop);