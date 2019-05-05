console.log('+init custom-square');

import { html, render } from '/webjars/lit-html/lit-html.js';

const template = document.createElement('template');
template.innerHTML = `
    <style>
        :host {
            all: initial;       /* 1st rule so subsequent properties are reset. */
            display: block;     /* by default, custom elements are display: inline */
            contain: content;   /* CSS containment */
            color: green;
            --background-color: purple;
        }

        :host([hidden]) { 
            display: none 
        }
        
        p {
            background-color: var(--background-color, blue);
        }
    </style>
    <link rel="stylesheet" type="text/css" href="components/custom-square.css">
    <div id="container"></div>
`;
const helloTemplate = (name) => html`<p>Hello ${name}</p>`;

// The order in which the lifecycle methods are executed is:
// constructor -> attributeChangedCallback -> connectedCallback
// you should defer setup of your component to connectedCallback as much as possible
class CustomSquare extends HTMLElement {
    constructor() {
        console.log('constructor');
        super();
        // Attach a shadow root to the element.
        const shadowRoot = this.attachShadow({ mode: 'open' });
        // shadowRoot.innerHTML = ``;
        shadowRoot.appendChild(template.content.cloneNode(true));
    }

    // Called every time the element is inserted into the DOM. Useful for running setup code, such as fetching resources or rendering. Generally, you should try to delay work until this time.
    connectedCallback() {
        console.log('connectedCallback');
        this.render();
        this.dispatchEvent(new CustomEvent('custom', {
            detail: { message: 'connectedCallback' }
        }));
    }

    // Called every time the element is removed from the DOM. Useful for running clean up code.
    disconnectedCallback() {
        console.log('disconnectedCallback');
        this.dispatchEvent(new CustomEvent('custom', {
            detail: { message: 'disconnectedCallback' }
        }));
    }

    static get observedAttributes() {
        return ['size', 'color', 'disabled'];
    }

    // Called when an observed attribute has been added, removed, updated, or replaced.
    // Also called for initial values when an element is created by the parser, or upgraded.
    // Note: only attributes listed in the observedAttributes property will receive this callback.
    // Only called for the disabled and open attributes due to observedAttributes
    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`attributeChangedCallback, name = ${name}, oldValue = ${oldValue}, newValue = ${newValue}`);
        if (name === 'disabled') {
            const element = this.shadowRoot.querySelector('div');
            if (this.disabled) {
                element.classList.add('disabled');
            } else {
                element.classList.remove('disabled');
            }
        }
        this.render();
    }

    // A getter/setter for an size property.
    get size() {
        if (this.hasAttribute('size')) {
            return +this.getAttribute('size');
        } else {
            return 100;
        }
    }

    set size(value) {
        console.log(`set size, value = ${value}`);
        // Reflect the value of the size property as an HTML attribute.
        if (Number.isNaN(value)) {
            this.removeAttribute('size');
        } else {
            this.setAttribute('size', value);
        }
    }

    // A getter/setter for a color property.
    get color() {
        if (this.hasAttribute('color')) {
            return this.getAttribute('color');
        } else {
            return 'red';
        }
    }

    set color(value) {
        console.log(`set color, value = ${value}`);
        // Reflect the value of the color property as an HTML attribute.
        if (value) {
            this.setAttribute('color', value);
        } else {
            this.removeAttribute('color');
        }
    }

    set disabled(value) {
        console.log(`set disabled, value = ${value}`);
        if (value) {
            this.setAttribute('disabled', '');
        } else {
            this.removeAttribute('disabled');
        }
    }

    get disabled() {
        return this.hasAttribute('disabled');
    }

    render() {
        console.log(`render size = ${this.size}, color = ${this.color}`);
        const element = this.shadowRoot.querySelector('div');
        element.style.width = `${this.size}px`;
        element.style.height = `${this.size}px`;
        element.style.backgroundColor = this.color;
        render(helloTemplate('World'), element);
        render(helloTemplate('Shudong'), element);
    }

    //static method
    static hello() {
        console.log(`hello`);
    }

    //static getter method
    static get name() {
        return `name`;
    }
}

//static class fields
CustomSquare.count = 0;

window.customElements.whenDefined('custom-square').then(() => {
    console.log('custom-square defined');
});

window.customElements.define('custom-square', CustomSquare);

const ready = () => {
    console.log('DOM is ready');

    const random = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    let square = document.querySelector('custom-square');

    document.querySelector('#btn-add').addEventListener('click', evt => {
        if (!square) {
            square = document.createElement('custom-square');
            square.color = 'blue';
            square.addEventListener('custom', (e) => {
                console.log('message from event:', e.detail.message);
            });
        }
        document.body.appendChild(square);

        document.querySelector('#btn-add').disabled = true;
        document.querySelector('#btn-update-attribute').disabled = false;
        document.querySelector('#btn-update-property').disabled = false;
        document.querySelector('#btn-remove').disabled = false;
    });

    document.querySelector('#btn-update-attribute').addEventListener('click', evt => {
        const square = document.querySelector('custom-square');
        square.setAttribute('size', random(50, 200));
        square.setAttribute('color', `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`);
    });

    document.querySelector('#btn-update-property').addEventListener('click', evt => {
        const square = document.querySelector('custom-square');
        square.size = random(50, 200);
        square.color = `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;
    });

    document.querySelector('#btn-remove').addEventListener('click', evt => {
        const square = document.querySelector('custom-square');
        document.body.removeChild(square);

        document.querySelector('#btn-add').disabled = false;
        document.querySelector('#btn-update-attribute').disabled = true;
        document.querySelector('#btn-update-property').disabled = true;
        document.querySelector('#btn-remove').disabled = true;
    });
};

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {  // `DOMContentLoaded` already fired
    ready();
}

console.log('-init custom-square');