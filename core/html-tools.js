import {jsonConverter} from './json-converter';
import {Transform} from './transform';
import {Async} from './async';
import {MegaFunction} from './mega-function';
import {printErr} from './functions';

function joinElements(source, list, clone)
{
    var result = Array.from(source);

    for (var i = 0; i < list.length; i++)
        result.push(list[i]);

    return result;
}

export class HTMLTools
{
    constructor(elements)
    {
        this.elements = elements.length >= 1 ? elements : [elements];
        this.query = '';
        this._id = Math.random();
        this._ready = false;
    }

    join(elements)
    {
        this.elements = joinElements(this.elements, elements);
        return this;
    }

    native()
    {
        return this.elements.length ? this.elements[0] : Array.from(this.elements);
    }

    get length()
    {
        return this.elements.length;
    }

    get tag()
    {
        return this.elements[0].tagName.toLowerCase();
    }

    get isHTMLTools()
    {
        return true;
    }

    ready(fn)
    {
        var self = this,
            result = new Async(),
            list = this.select("img, link, script, iframe"),
            checkout = function()
            {
                list._countReady++;
                if (list._countReady == list.length)
                {
                    result.resolve();
                    if (typeof fn == "function") fn();
                }
            }
        
        list = joinElements(list.elements, this.elements);
        list._countReady = 0;
        list.forEach( element => {

            var tag = element.tagName.toLowerCase(),
                complete = true;
                
            if (tag == "img")
                complete = element.complete;

            else if (tag == "link" || tag == "iframe")
                complete = false;

            complete ? checkout() : element.addEventListener("load", checkout);

        });

        return result;
    }

    mutation(fn, options)
    {
        if ("MutationObserver" in window && !element._observer)
        {
            this.mutations = [];
            this.elements.forEach( element => this._observMutation(element, fn, options) );
        }
    }

    _observMutation(element, fn, options)
    {
        var mutation = new MutationObserver(function(mutations){
            fn(mutations);
        });

        mutation.observe(element, options);

        this.mutations.push(mutation);
    }

    visible(maxDepth = 3)
    {
        var found = this._findHidden(this.elements[0], maxDepth, 0)
        return found ? { element : found } : {}
    }

    _findHidden(element, maxDepth, depth)
    {
        if (depth >= maxDepth) return false;

        var result = false,
            parent = element.parentElement || element.parentNode || null;

        if (parent && parent != document)
            result = !this.display(parent) ? parent : this._findHidden(parent, maxDepth, ++depth);

        return result;
    }

    display(element)
    {
        var display;

        if (!element) element = this.elements[0]

        element.style.display
        ? display = element.style.display
        : display = getComputedStyle(element).display;

        return display == "none" ? false : true;
    }

    select(query)
    {
        var elements = [], result;

        if (this.elements.length == 1)
            elements = this.elements[0].querySelectorAll(query);

        else for (var i = 0; i < this.elements.length; i++)
        {
            var search = this.elements[i].querySelectorAll(query),
                index = elements.length;

            for (var j = 0; j < search.length; j++)
                elements[index + j] = search[j];
        }

        result = new HTMLTools(elements);
        result.query = query;

        return result;
    }

    before(htl, remove)
    {
        this._insert(htl, remove, "beforebegin");
        return this;
    }

    after(htl, remove)
    {
        this._insert(htl, remove, "afterend");
        return this;
    }

    append(htl, remove)
    {
        this._insert(htl, remove, "beforeend");
        return this;
    }

    appendTo(target, remove)
    {
        target.append(this, remove);
        return this;
    }

    prepend(htl, remove)
    {
        this._insert(htl, remove, "afterbegin");
        return this;
    }

    _insert(htl, remove, position)
    {
        if (htl.isHTMLTools)
        {
            if (!Array.isArray(htl.elements))
                htl.elements = Array.from(htl.elements);

            if (!htl._srcElements)
                htl._srcElements = htl.elements.slice();

            for (var i = 0; i < this.elements.length; i++)
            for (var j = 0; j < htl._srcElements.length; j++)
            {
                let element = htl._srcElements[j];

                if (!remove)
                {
                    element = htl._srcElements[j].cloneNode(true);
                    htl.elements.push(element);
                }

                this.elements[i].insertAdjacentElement(position, element);
            }
        }
        else if (Array.isArray(htl))
        {
            for (var i = 0; i < htl.length; i++)
                this._insert(htl[i], remove, position);
        }
    }

    jsonBefore(json)
    {
        return this._insertJson(json, "beforebegin");
    }

    jsonAfter(json)
    {
        return this._insertJson(json, "afterend");
    }

    jsonAppend(json)
    {
        return this._insertJson(json, "beforeend");
    }

    jsonPrepend(json)
    {
        return this._insertJson(json, "afterbegin");
    }

    jsonGet(element)
    {
        var result = [];

        if (element)
            result = jsonConverter.getFromHTML(element);

        else if (this.elements.length)
            this.elements.length == 1
            ? result = jsonConverter.getFromHTML(this.elements[0])
            : this.elements.forEach( element => result.push(jsonConverter.getFromHTML(element)) );

        else result = false;

        return result;
    }

    _insertJson(json, position)
    {
        var clones = [];

        jsonConverter.toHTML(json);

        this.elements.forEach( current => {
            var element = jsonConverter.build(json);
            clones.push(element);
            current.insertAdjacentElement(position, element);
        });

        return new HTMLTools(clones);
    }

    tplAppend(tpl)
    {
        return tpl.isTemplate ? tpl.appendTo(this) : false;
    }

    addClass(name)
    {
        for (var i = 0; i < this.elements.length; i++)
            this.elements[i].classList.add(name);

        return this;
    }

    removeClass(name)
    {
        for (var i = 0; i < this.elements.length; i++)
            this.elements[i].classList.remove(name);

        return this;
    }

    html(str, clear = true)
    {
        if (str !== undefined)
            for (var i = 0; i < this.elements.length; i++)
            {
                if (clear) this.elements[i].innerHTML = str;
                else this.elements[i].innerHTML += str;
            }

        else return this.elements[0].innerHTML;

        return this;
    }

    text(str)
    {
        if (str !== undefined)
            for (var i = 0; i < this.elements.length; i++)
                this.elements[i].innerText = str;

        else return this.elements[0].innerText;

        return this;
    }

    value(data)
    {
        if (data !== undefined)
            for (var i = 0; i < this.elements.length; i++)
                this.elements[i].value = data;

        else return this.elements[0].value;

        return this;
    }

    active(yes)
    {
        yes ? this.addClass("active") : this.removeClass("active");

        return this;
    }

    checked(yes)
    {
        if (typeof yes == "boolean")
            for (var i = 0; i < this.elements.length; i++)
            {
                if ("checked" in this.elements[i])
                    this.elements[i].checked = yes;
            }

        else if (yes == undefined)
            return this.elements[0].checked;

        return this;
    }

    toogle()
    {
        for (var i = 0; i < this.elements.length; i++)
        {
            if ("checked" in this.elements[i])
                this.elements[i].checked = !this.elements[i].checked;
        }

        return this;
    }

    get index()
    {
        return this.elements[0].selectedIndex;
    }

    choose(index)
    {
        for (var i = 0; i < this.elements.length; i++)
        {
            if ("selectedIndex" in this.elements[i])
                this.elements[i].selectedIndex = index;
        }

        return this;
    }

    width(value)
    {
        if (value === undefined)
            return this.elements[0].offsetWidth;

        if (typeof value == "number")
            value += "px";

        for (var i = 0; i < this.elements.length; i++)
            this.elements[i].style.width = value;
        
        return this;
    }

    height(value)
    {
        if (value === undefined)
            return this.elements[0].offsetHeight;

        if (typeof value == "number")
            value += "px";

        for (var i = 0; i < this.elements.length; i++)
            this.elements[i].style.height = value;

        return this;
    }

    offsetParent()
    {
        var element = this.elements[0];
        return {
            top  : element.offsetTop,
            left : element.offsetLeft
        }
    }

    offsetWindow()
    {
        return this.elements[0].getBoundingClientRect();
    }

    offsetScroll()
    {
        var element = this.elements[0];
        return {
            top  : element.scrollTop,
            left : element.scrollLeft
        }
    }

    offsetPage()
    {
        var element = this.elements[0],
            rect = element.getBoundingClientRect(),
            doc  = document.documentElement,
            top  = rect.top + window.pageYOffset - doc.clientTop,
            left = rect.left + window.pageXOffset - doc.clientLeft;
        
        return {
            top   : Math.round(top),
            left  : Math.round(left),
            bottom: Math.round(top + element.offsetHeight),
            right : Math.round(left + element.offsetWidth)
        }
    }

    scroll()
    {

    }

    wrap(classList, revOrder)
    {
        if (typeof classList == "string")
        {
            var result = [],
                wrapper = document.createElement("div"); 
                wrapper.classList.add(classList);

            for (var i = 0; i < this.elements.length; i++)
            {
                let element = this.elements[i],
                    wrapClone = wrapper.cloneNode();

                element.parentNode.insertBefore(wrapClone, element);
                wrapClone.appendChild(element);

                result.push(wrapClone);
            }

            return new HTMLTools(result);
        }
        else if (Array.isArray(classList))
        {
            var result;

            if (!revOrder)
            {
                result = this.wrap(classList[0]);
                for (var i = 1; i < classList.length; i++)
                    this.wrap(classList[i]);
            }
            else
            {
                result = this.wrap(classList[classList.length - 1]);
                for (var i = classList.length - 2; i >= 0; i--)
                    this.wrap(classList[i]);
            }

            return result;
        }
    }

    hide()
    {
        for (var i = 0; i < this.elements.length; i++)
            this.elements[i].style.display = "none";

        return this;
    }

    show(disp = "block")
    {
        for (var i = 0; i < this.elements.length; i++)
            this.elements[i].style.display = disp;

        return this;
    }

    parent()
    {
        var parents = [];

        for (var i = 0; i < this.elements.length; i++)
            parents.push(this.elements[i].parentElement || this.elements[i].parentNode || null)

        return new HTMLTools(parents);
    }

    transform(data)
    {
        var transform = new Transform(this);
            transform.apply(data);
            
        return transform;
    }

    getAttr(name)
    {
        var element = this.elements[0],
            result;

        if (element.nodeType == 1 && element.attributes.length)
        {
            result = {};

            if (typeof name == "string")
                result = element.getAttribute(name);

            else if (Array.isArray(name))
                for (var i = 0; i < name.length; i++)
                {
                    let attr = element.getAttribute(item);
                    if (attr) result[item] = attr;
                }
            
            else if (!name)
                for (var i = 0; i < element.attributes.length; i++)
                {
                    let attr = element.attributes[i];
                    result[attr.name] = attr.value;
                }
        }

        return result
    }

    setAttr(attr, value)
    {
        if (typeof attr == "string" && value !== undefined)
            for (var i = 0; i < this.elements.length; i++)
                this.elements[i].setAttribute(attr, value)

        else if (typeof attr == "object")
            for (var i = 0; i < this.elements.length; i++)
            {
                for (var n in attr)
                    this.elements[i].setAttribute(n, attr[n])
            }

        return this;
    }

    unsetAttr(name)
    {
        if (typeof name == "string")
            for (var i = 0; i < this.elements.length; i++)
                this.elements[i].removeAttribute(name)

        else if (Array.isArray(name))
            for (var i = 0; i < this.elements.length; i++)
            {
                for (var j = 0; j < name.length; j++)
                    this.elements[i].removeAttribute(name[j])
            }

        else if (name == undefined)
        {
            var list = this.getAttr();
            
            if (list)
                for (var i = 0; i < this.elements.length; i++)
                {
                    for (var item in list)
                        this.elements[i].removeAttribute(item)
                }
        }

        return this;
    }

    style(name, value)
    {
        if (typeof name == "string" && value !== undefined)
            for (var i = 0; i < this.elements.length; i++)
                this.elements[i].style[name] = value;

        else if (typeof name == "object")
            for (var i = 0; i < this.elements.length; i++)
            {
                for (var item in name)
                    this.elements[i].style[item] = name[item];
            }

        else if (typeof name == "string" && value == undefined)
            return this.elements[0].style[name];

        return this;
    }

    eventAttach(data, fn)
    {
        if (!$html._eventList[this._id])
            $html._eventList[this._id] = {};

        var list = $html._eventList[this._id];

        if (typeof data == "string" && fn !== undefined)
            this._eventAttach(list, data, fn);

        else if (typeof data == "object")
            for (var event in data)
                this._eventAttach(list, event, data[event]);

        return this;
    }

    eventDispatch(type)
    {
        var event = new Event(type);

        for (var i = 0; i < this.elements.length; i++)
            this.elements[i].dispatchEvent(event)

        return this;
    }

    eventStart(type)
    {
        $html._eventFunction(this._id, type);
        return this;
    }

    eventDetach(name)
    {
        var list = $html._eventList[this._id];

        if (name)
            for (var event in list)
                this.elements.unsetAttr(event.substr(0, 2));
        
        else $html._eventList[this._id][name] = undefined;

        return this;
    }

    _eventAttach(list, name, fn)
    {
        var evAttr = {}

        list[name]
        ? list[name].push(fn)
        : list[name] = new MegaFunction(fn);
        
        this.setAttr("on" + name, "$html._eventFunction(" + this._id + ", '" + name + "', event)");
    }

    each(fn)
    {
        this.elements.forEach((element, index, array) =>
            fn($html.convert(element), index, array));

        return this;
    }

    clone()
    {
        var clones = [];

        this.elements.forEach( element => clones.push(element.cloneNode(true)) );

        return new HTMLTools(clones);
    }

    merge(htl)
    {
        this.elements = this.elements.concat(htl.elements);
        return this;
    }

    clear()
    {
        this.html("");
    }

    remove()
    {
        for (var i = 0; i < this.elements.length; i++)
        {
            let element = this.elements[i];

            if (element.parentNode)
                element.parentNode.removeChild(element);
        }

        this.elements = [];

        return this;
    }
}