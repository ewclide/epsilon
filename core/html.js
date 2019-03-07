import {HTMLTools, eventList}  from './html-tools';
import {printErr} from './functions';
import StyleSheet from './stylesheet';

const proto = HTMLTools.prototype;
const html = new HTMLTools(document);

const $event = {
    fire: (elem, type, e) => {
        if (!eventList.has(elem)) {
            printErr(`Can't dispatch event on element ${elem}`);
            return;
        }

        const events = eventList.get(elem);
        if (events.has(type)) {
            events.get(type).call(e);
        }
    }
}

html.extend = function(name, method) {
    proto[name] = method;
    return this;
}

html.ready = new Promise((resolve) => {
    if (html._ready) {
        resolve();
    } else {
        document.addEventListener('DOMContentLoaded', resolve);
    }
});

html.script = function(source) {
    return new Promise((resolve, reject) => {

        const element = document.createElement('script');

        element.src = source;
        element.onload = () => resolve(element);
        element.onerror = () => reject(`can't load the script "${source}"`);

        document.body.appendChild(element);
    });
}

html.create = function(tag, attrs, styles) {
    const htls = new HTMLTools(document.createElement(tag));

    if (typeof attrs == 'string') {
        htls.addClass(attrs);
    }

    else if (typeof attrs == 'object') {
        htls.setAttr(attrs);
    }

    if (styles) htls.style(styles);

    return htls;
}

html.convert = function(elements) {
    if (elements.nodeType === 1 || elements.nodeType === 9) {
        return new HTMLTools(elements);
    }

    else if (typeof elements == 'string') {
        return this.select(elements);
    }

    else if (elements.isHTMLTools) {
        return elements;
    }

    else {
        return false;
    }
}

html.parseXML = function(data) {
    let parse, errors = '';

    if (typeof window.DOMParser != 'undefined') {
        parse = (str) => (new window.DOMParser()).parseFromString(str, 'text/xml');
    }

    else if (typeof window.ActiveXObject != 'undefined' && new window.ActiveXObject('Microsoft.XMLDOM')) {
        parse = (str) => {
            const xml = new window.ActiveXObject('Microsoft.XMLDOM');
            xml.async = 'false';
            xml.loadXML(str);
            return xml;
        }
    }

    else {
        errors = 'parseXML not supported by this browser!';
    }

    return errors ? printErr(errors) : parse(data);
}

html.createStyleSheet = function() {
    return new StyleSheet();
}

html._body = new HTMLTools();

const desc = {
    configurable: false,
    enumerable: false,
    writable: false
}

Object.defineProperty(window, '$event', { ...desc, value: $event })
Object.defineProperty(html, 'body', {
    ...desc,
    get: () => {
        if (!document.body) {
            printErr('body element is currently unavailable!');
        } else if (!this._body.length) {
            this._body.join(document.body);
        }

        return this._body;
    }
});

document.addEventListener('DOMContentLoaded', () => html._ready = true );

export default html;