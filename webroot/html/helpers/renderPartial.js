module.exports.register = function (Handlebars) {

	Handlebars.registerHelper("renderPartial", function (name, context) {

		var fn,
			template = Handlebars.partials[name];

		if (typeof template !== 'Function') {
			// not compiled, so we can compile it safely
			fn = Handlebars.compile(template);
		} else {

			// already compiled, just reuse it
			fn = template;
		w}

		var output = fn(context).replace(/^\s+/, '');

		return new Handlebars.SafeString(output);
	});
};