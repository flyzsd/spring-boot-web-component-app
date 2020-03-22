// @ts-ignore
// import {LitElement, html, customElement, property, css} from 'https://unpkg.com/lit-element?module';
import {LitElement, html, customElement, property, css} from '../lit-element/lit-element.js';

/**
 * Use the customElement decorator to define your class as
 * a custom element. Registers <my-element> as an HTML tag.
 */
@customElement('my-lit-element')
export class MyLitElement extends LitElement {
    private myProp: number;

    static get styles() {
        return [
            css`div { color: red; }`,
            css`div { background-color: black; }`
        ];
    }

    static get properties() {
        return {
            myProp: {
                type: Number,

                /**
                 * Compare myProp's new value with its old value.
                 *
                 * Only consider myProp to have changed if newVal is larger than
                 * oldVal.
                 */
                hasChanged(newVal, oldVal) {
                    if (newVal > oldVal) {
                        console.log(`${newVal} > ${oldVal}. hasChanged: true.`);
                        return true;
                    } else {
                        console.log(`${newVal} <= ${oldVal}. hasChanged: false.`);
                        return false;
                    }
                }
            }
        };
    }

    constructor(){
        super();
        this.myProp = 1;
    }

    /**
     * Create an observed property. Triggers update on change.
     */
    @property({type: String}) foo = 'foo';
    @property({type: String}) prop1 = 'Hello World';
    @property({type: Number}) prop2 = 5;
    @property({type: Boolean}) prop3 = true;
    @property({type: Array}) prop4 = [1, 2, 3];
    @property({type: Object}) prop5 = {subprop1: 'prop 5 subprop1 value'};

    /**
     * Implement `render` to define a template for your element.
     */
    render() {
        /**
         * Use JavaScript expressions to include property values in
         * the element template.
         */
        return html`<div><p>${this.foo}</p></div>${this.buttonTemplate}`;
    }

    private get buttonTemplate() {
        return html`<button @click="${this.clickHandler}">pie?</button>`;
    }

    private clickHandler(e) {
        console.log(`button clicked ${e} -> ${this}`);
    }

    public updated(changedProperties) {
        changedProperties.forEach((oldValue, propName) => {
            console.log(`${propName} changed. oldValue: ${oldValue}`);
        });
    }
}
