const {Observable, Subject, ReplaySubject, from, of, range, fromEvent, merge} = rxjs;
const {tap, map, filter, switchMap, mergeMap, takeUntil, catchError} = rxjs.operators;

const template = document.createElement('template');
template.innerHTML = `
    <style>
        :host {
            all: initial;       /* 1st rule so subsequent properties are reset. */
            display: block;     /* by default, custom elements are display: inline */
            contain: content;   /* CSS containment */
            background: #fff;
            border: 1px solid black;
        }

        :host([hidden]) { 
            display: none 
        }
        
        canvas {
            width: 512px;
            height: 512px;
            border-width: 1px;
            border-style: solid;
        }
    </style>
    <canvas></canvas>
    <table>
      <tr>
        <td>AMOUNT</td>
        <td><input id="amount" type="range" min="3" max="40" value="10"></td>
      </tr>
      <tr>
        <td>SIZE</td>
        <td><input id="size" type="range" min="0" max="4" step="0.01" value="1"></td>
      </tr>
      <tr>
        <td>OPACITY</td>
        <td><input id="opacity" type="range" min="0" max="1" step="0.01" value="1"></td>
      </tr>
      <tr>
        <td>ATTENUATION</td>
        <td><input id="attenuation" type="checkbox"></td>
      </tr>
    </table>
    <br/>
    <a href="#" id="link">Download</a>
`;

class DragdropOutput extends HTMLElement {
    constructor() {
        super();
        // Attach a shadow root to the element.
        this.attachShadow({mode: 'open'}).appendChild(template.content.cloneNode(true));
    }

    // Called every time the element is inserted into the DOM. Useful for running setup code, such as fetching resources or rendering. Generally, you should try to delay work until this time.
    connectedCallback() {
        this.disconnected$ = new Subject();

        const link = this.shadowRoot.querySelector('#link');
        fromEvent(link, 'click').pipe(
            tap(e => e.preventDefault()),
            map(() => {
                link.href = this.shadowRoot.querySelector('canvas').toDataURL();
                link.download = 'pointify.png';
            }),
            takeUntil(this.disconnected$)
        ).subscribe();

        from(this.shadowRoot.querySelectorAll('input')).pipe(
            mergeMap(e => fromEvent(e, 'input')),
            tap(e => e.preventDefault()),
            map(() => this.draw()),
            takeUntil(this.disconnected$)
        ).subscribe();
    }

    // Called every time the element is removed from the DOM. Useful for running clean up code.
    disconnectedCallback() {
        this.disconnected$.next(true);
        this.disconnected$.complete();
    }

    set image(image) {
        const canvas = this.shadowRoot.querySelector('canvas');

        // resize image to something reasonable
        canvas.width = Math.min(1024, Math.max(256, image.width));
        canvas.height = (image.height * (canvas.width / image.width));

        // clone buffer to get one of same size
        const buf = canvas.cloneNode(true);
        const ctx = buf.getContext('2d');
        ctx.drawImage(image, 0, 0, buf.width, buf.height);
        this.data = ctx.getImageData(0, 0, buf.width, buf.height).data;
        console.info(this.data);
        this.draw();
    }

    draw() {
        const canvas = this.shadowRoot.querySelector('canvas');
        canvas.width = canvas.width;  // clear canvas
        const context = canvas.getContext('2d');

        const attenuation = this.shadowRoot.getElementById('attenuation').checked;
        const amount = +this.shadowRoot.getElementById('amount').value;
        const size = this.shadowRoot.getElementById('size').value * amount;
        const opacity = this.shadowRoot.getElementById('opacity').value;

        for (let y = amount; y < canvas.height; y += amount * 2) {
            for (let x = amount; x < canvas.width; x += amount * 2) {
                const index = ((y * canvas.width) + x) * 4;
                const [r,g,b] = this.data.slice(index, index+3);
                const color = `rgba(${r},${g},${b},${opacity})`;

                const weight = 1 - ( this.data[ index ] / 255 );
                const radius = (attenuation ? size * weight : size);

                context.beginPath();
                context.arc(x, y, radius, 0, 360, false);
                context.fillStyle = color;
                context.fill();
            }
        }
    }
}

customElements.define('dragdrop-output', DragdropOutput);