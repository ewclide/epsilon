let mega = new DEW.MegaFunction();
const cb = new DEW.Invoker();

cb.push(function first(v){
	return v + 1;
});
cb.push(v => v + 2);
cb.push(v => v + 3);

mega.push(function first(v){
	return v + 1;
});
mega.push(v => v + 2);
mega.push(v => v + 3);

log(cb.sequence(2));
log(cb.filter((i,v) => v < 5, 2));
log(cb.call(5));
log(cb.single('first', 10));

/**
results : 8, 3, 5, 11
*/

// log(mega(2, true));
// log(mega(2, true, function(v, idx){
//     return v < 5;
// }));
// log(mega(5));
// log(mega.invoke('first', 10));

/**
results : 8, 5, 5, 11
*/
