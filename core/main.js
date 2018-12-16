﻿import './polyfill';
import * as fn from './functions';
import * as array from'./array';
import * as object from './object';
import {bind} from './binder';
import {http} from './http';
import {url} from './url';
import html from './html';
import Invoker from './invoker';
import Template from './template';
import Timer from './timer';
import Async from './async';
import Lerp from './lerp';

const DEW = {
	browser: fn.browser,
	define: fn.define,
	isType: fn.isType,
	strParse: fn.strParse,
	jsonParse: fn.jsonParse,
	intParse: fn.intParse,
	floatParse: fn.floatParse,
	randi: fn.randi,
	randf: fn.randf,
	randKey: fn.randKey,
	vmin: fn.vmin,
	vmax: fn.vmax,
	vw: fn.vw,
	vh: fn.vh,
	construct: fn.construct,
	publish: fn.publish,
	printErr: fn.printErr,
	fetchSettings: fn.fetchSettings,
	getElementData: fn.getElementData,

	array,
	object,

	Invoker,
	Template,
	Async,
	Timer,
	Lerp,

	bind,
	http,
	url,
	html
}

object.define(window, "log", {
	value  : fn.log,
	config : false,
	write  : false
});

object.define(window, { DEW })