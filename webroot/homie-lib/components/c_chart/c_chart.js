/*!
 * Graphite: C_chart [data-c-chart]
 * Make charts
 *
 *  @author Rasmus Elken <rasmus.elken@digitaslbi.com> | <rasmuselken@gmail.com>
 *
 */
(function (G) {

	'use strict';

	/*
	 * Failsafe
	 */
	if (!G) return window.console ? console.warn('Graphite Core is not available!') : false;

	// //////////////////////////////////////////////////////////////////////////
	// Private methods & values
	// //////////////////////////////////////////////////////////////////////////
	var _config = {
			activeClass: 'active'
		},
		_chart = null,
		_$el = null,
		_data = null,
		_notify = function (event, data, sender) {
			if (G.has.pubsub) {
				return G.pubsubnotify(event, data, sender);
			}
		},
		_listen = function (event, listener) {
			if (G.has.pubsub) {
				return G.pubsublisten(event, listener);
			}
		},
		_ignore = function (handler) {
			if (G.has.pubsub) {
				return G.pubsubignore(handler);
			}
		},
		_init = function(options){
			_$el = $(options.el);
			_renderChart(options);

		},
		_renderChart=function(options){
			if(options.data){
				if(typeof options.data === 'function'){
					_data = options.data();
				} else if(typeof options.data === 'object'){
					_data = options.data;
				} else{
					console.warn('Chart data is malformed')
				}
			}
			_chart = new Chart(options.canvasContext).Line(_data, options);
		},
		/**
		 * Bind events to elements.
		 * @param component
		 * @private
		 */
		_bindEvents = function (component) {
		}
	// //////////////////////////////////////////////////////////////////////////
	// Instance
	// //////////////////////////////////////////////////////////////////////////
	var Component = function (el, options) {

		var self = this,
			attrs = G.attrOptions(el[0], [
			]);

		this.el = el;
		this.options = G.extend({
			pointDot : false,
			datasetStrokeWidth : 1,
			responsive: true,
			scaleOverlay : true,
			scaleGridLineColor : "rgba(255,255,255,0.2)",
			scaleGridLineWidth: 0.5,
			canvasContext: options.el.get(0).getContext("2d")
		}, attrs, options || {});


		return this.initialize();

	};

	G.extend(Component.prototype, {
		initialize: function () {
			if (this.options.beforeInit) {
				this.options.beforeInit.call(this);
			}
			_init(this.options);

			if (this.options.afterInit) {
				this.options.afterInit.call(this);
			}
			return this;
		},
		update: function () {
			_notify('c_chart/updated', {});
		},
		destroy: function ($el) {
			_notify('c_chart/destroyed', {});
		}
	});


	/// //////////////////////////////////////////////////////////////////////////
	// Factory
	// //////////////////////////////////////////////////////////////////////////
	var factory = function (options) {

		var self = this,
			obj = {},
			length,
			options = options || {};



		this.options = G.extend({
			el: $(options.el || '[data-c-chart]')
		}, options || {});

		length = this.options.el.length;

		if (length > 0) {
			G.each(this.options.el, function (el, i) {
				var name = el.getAttribute('data-c-chart'),
					id = name !== null || name !== '' ? name : i;
				obj[id] = new Component($(el), options);
			});
			return {
				el: $(this.options.el),
				component: obj
			};
		} else {
			G.warn('No tabs found in DOM, (data-c-chart)');
		}
	};

	// Expose either as CommonJS module or in global namespace and register as AMD module
	if (typeof define === "function" && define.amd) {
		define(['graphite'], function (G) {
			return G.register('c_chart', factory);
		});
	} else {
		G.register('c_chart', factory);
	}


})(window.window.Graphite);