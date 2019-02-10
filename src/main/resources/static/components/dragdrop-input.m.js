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
        
        div {
            width: 512px;
            height: 512px;
            border-width: 1px;
            border-style: solid;
        }
    </style>
    <div></div>
`;

class DragdropInput extends HTMLElement {
    constructor() {
        super();
        // Attach a shadow root to the element.
        this.attachShadow({mode: 'open'}).appendChild(template.content.cloneNode(true));
    }

    // Called every time the element is inserted into the DOM. Useful for running setup code, such as fetching resources or rendering. Generally, you should try to delay work until this time.
    connectedCallback() {
        this.disconnected$ = new Subject();
        fromEvent(this, 'dragover').pipe(
            tap(e => e.preventDefault()),
            takeUntil(this.disconnected$)
        ).subscribe();

        fromEvent(this, 'drop').pipe(
            tap(e => e.preventDefault()),
            map(e => e.dataTransfer.files[0]),
            map(file => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    console.dir(event);
                    const image = new Image();
                    image.src = event.target.result;
                    image.onload = () => {
                        // when the image is ready
                        const params = {
                            detail: image,
                            bubbles: true,
                        };
                        const ev = new CustomEvent('image', params);
                        this.dispatchEvent(ev);
                    };
                    const container = this.shadowRoot.querySelector('div');
                    while (container.firstChild) {
                        container.removeChild(container.firstChild);
                    }
                    container.appendChild(image);
                };
                reader.readAsDataURL(file);
            }),
            takeUntil(this.disconnected$)
        ).subscribe();
    }

    // Called every time the element is removed from the DOM. Useful for running clean up code.
    disconnectedCallback() {
        this.disconnected$.next(true);
        this.disconnected$.complete();
    }
}

customElements.define('dragdrop-input', DragdropInput);