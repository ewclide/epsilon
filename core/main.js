﻿import './polyfill';
import * as func from './functions';
import {array} from'./array';
import {object} from './object';
import {Template} from './template';
import {bind} from './binder';
import {Async} from './async';
import {Timer} from './timer';
import {HTTP} from './http';
import {URLmanager} from './url';
import {$html} from './html';

var Dew = {
	megaFunction : func.megaFunction,
	define  : func.define,
	istype  : func.istype,
	strconv : func.strconv,
	random  : func.random,

	object : object,
	array  : array,

	Template : Template,
	Async : Async,
	Timer : Timer,

	bind  : bind,
	http  : new HTTP,
	url   : new URLmanager
}

func.define(window, "log", {
	value  : func.log,
	config : false,
	write  : false
});

func.define(window, {
	Dew   : Dew,
	$html : $html
})
