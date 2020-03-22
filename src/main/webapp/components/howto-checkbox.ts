// @ts-ignore
import {html, render} from '../webjars/lit-html/lit-html.js';
// @ts-ignore
import {styleMap} from '../webjars/lit-html/directives/style-map.js';
// @ts-ignore
import {classMap} from '../webjars/lit-html/directives/class-map.js';
// @ts-ignore
import {ifDefined} from '../webjars/lit-html/directives/if-defined.js';
// @ts-ignore
import {guard} from '../webjars/lit-html/directives/guard.js';
// // @ts-ignore
// import {live} from '../webjars/lit-html/directives/live.js';
// @ts-ignore
import {unsafeHTML} from '../webjars/lit-html/directives/unsafe-html.js';
// @ts-ignore
import {until} from '../webjars/lit-html/directives/until.js';

const person = {
    name: "hello",
    age: 10
};

const highlightStyles = {color: 'white', backgroundColor: 'red', 'font-family': 'roboto'};
const baseClasses = {
    'menu-item': true,
    // ...
};
const mergedClasses = Object.assign({active: true}, baseClasses);

const items = [1, 2, 3];
const list = () => html`items = ${items.map((i) => `item: ${i}`)}`;

const image = {
    filename: undefined
};
const imageTemplate = () => html`
  <img src="/images/${ifDefined(image.filename)}">
`;
const markup = '<div>Some HTML to render.</div>';

const content = fetch('http://example.com/movies.json').then(r => r.text());
const untilTemplate = html`${until(content, html`<span>Loading...</span>`)}`;

const myTemplate = (name, person) => html`<p>Hello ${name}</p>
<div name=${name.toLowerCase()} ?disabled=${name} .person=${person} @click=${(e) => console.log(`click me ${e}`)} style=${styleMap(highlightStyles)} class=${classMap(mergedClasses)}>click me</div>
${list()}
<ul>
    ${items.map((i) => html`<li>${i}</li>`)}
</ul>
<div>
    ${imageTemplate()}
</div>
<div>
${guard([items], () => items.map(item => html`${item}`))}
</div>
${unsafeHTML(markup)}
<div>${markup}</div>
${untilTemplate}
`;
console.log(myTemplate);

render(myTemplate('World', person), document.body);