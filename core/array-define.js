Array.prototype.$define({
	$have : function(value)
	{
		var index = this.indexOf(value);
		if (index == -1) return false;
		else return { index : index }
	},
	$copy : function()
	{
		return this.slice().sort();
	}
});

function haveInArray(array, value)
{
	for (var i = 0; i < array.length; i++)
		if (array[i] == value) return true;
		else continue;

	return false;
}

Array.prototype.$define("$remove", {
	get : function()
	{
		var self = this;

		return {
			index : function(index)
			{
				var saved = [],
					list = [];
					list = list.concat(index);

				for (var i = 0; i < list.length; i++)
				{
					var indexDel = list[i];

					if (indexDel < self.length && indexDel >= 0)
					{
						saved.push(self[indexDel]);
						self[indexDel] = undefined;
					}
				}

				self.$remove.value();

				return saved;
			},
			value : function(value)
			{
				var list = [];
					list = list.concat(value);

				for (var i = 0; i < self.length; i++)
				{
					if (haveInArray(list, self[i]))
					{
						self.splice(i, 1);
						i--;
					}
				}

				return list;
			},
			first : function()
			{
				return self.splice(0, 1);
			},
			last : function()
			{
				return self.pop();
			}
		}
	},
	set : function(){}
});