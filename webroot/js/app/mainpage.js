/*
 * $Id: mainpage.js 18 2013-05-03 08:28:57Z akikar $
 *
 * Initialize App for `mainpage`.
 */

require([

	// core
	'jquery',
	'graphite',
	'text',
	'underscore',
	// extensions

	'graphite_pubsub',
	'graphite_utilities',
	'graphite_responsive',

	//Plugins
	'fastclick',
	'triggerPath',
	'chartjs',
	'moment'

], function ( $, G, requiretext, underscore, pubsub, utils, responsive, fastclick, triggerPath, chartjs, moment) {

	'use strict';

	// //////////////////////////////////////////////////////////
	// Private utilities
	// /////////////////////////////////////////////////////////

	/*
	 * DOM READY
	 */
	$(function () {
		var ZWaveAPIData = { updateTime: 0 };

		// Init ZWaveAPIData structure
//		$.triggerPath.init(ZWaveAPIData);
//		var miliseconds = new Date(0);




//http://192.168.1.41:8083/
		//$.postJSON('/ZWaveAPI/Data/' + ZWaveAPIData.updateTime, handleDataUpdate, sync);


//		$.getJSON( "http://192.168.1.41/json/da", function( data ) {
//			console.log(data);
//
//		});
		// Get context with jQuery - using jQuery's .get() method.
		var $tempChart = $("#temperatureChart").get(0).getContext("2d"),
			$humidChart = $("#humidityChart").get(0).getContext("2d"),
			_tempChart,
			_humidChart,
			_chartOptionsGeneral = {
				pointDot : false,
				datasetStrokeWidth : 1,
				responsive: true
			},
			_chartOptionsTemp = _.extend({
				scaleLabel: "<%=value%> ℃"
			}, _chartOptionsGeneral),
			_chartOptionsHumid = _.extend({
				scaleLabel: "<%=value%> %"
			}, _chartOptionsGeneral);

		// This will get the first returned node in the jQuery collection.
//		var _chart = null;
		$.getJSON( "json/logAM2302.json", function( data ) {
			var labels = [],
				temperatures = [],
				humidities = [];
			_.each(data, function(object, i) {
				var dateMoment = moment(object.timestamp).format('D-M-YY HH:MM');
				labels.push(dateMoment);
				temperatures.push(parseFloat(object.temperature));
				humidities.push(parseFloat(object.humidity));
			})

			var temperatureDataSet = [{
				label: "Temperature",
				fillColor: "rgba(220,220,220,0.2)",
				strokeColor: "rgba(220,220,220,1)",
				pointColor: "rgba(220,220,220,1)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(220,220,220,1)",
				data: temperatures
			}];

			var humidDataSet = [{
				label: "Humidity",
				fillColor: "rgba(151,187,205,0.2)",
				strokeColor: "rgba(151,187,205,1)",
				pointColor: "rgba(151,187,205,1)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(151,187,205,1)",
				data: humidities
			}];

			var temperatureChartData = {
				labels: labels,
				datasets: temperatureDataSet
			};
			var humidityChartData = {
				labels: labels,
				datasets: humidDataSet
			};

			_tempChart = new Chart($tempChart).Line(temperatureChartData, _chartOptionsTemp);
			_humidChart = new Chart($humidChart).Line(humidityChartData, _chartOptionsHumid);

		});

		var now = Math.round((new Date()).getTime() / 1000);

//		$.getJSON( "http://192.168.1.41:8083/ZWaveAPI/Data/0", function( data ) {
//			ZWaveAPIData = data;
//			console.log(ZWaveAPIData);
////				$.each(ZWaveAPIData.devices, function (nodeId, node) {
////					var controllerNodeId = ZWaveAPIData.controller.data.nodeId.value;
////					var device = {};
////					_.extend(device, node.data );
////
////					console.log(ZWaveAPIData);
////
////
////
////
////					if (nodeId == 255 || nodeId == controllerNodeId)
////					// We skip broadcase and self
////						return;
////
////					console.log(device);
//////					// Device status and battery
////					var basicType = node.data.basicType.value;
////					var genericType = node.data.genericType.value;
////					var specificType = node.data.specificType.value;
////					var isListening = node.data.isListening.value;
////					var isFLiRS = !isListening && (node.data.sensor250.value || node.data.sensor1000.value);
////					var hasWakeup = 0x84 in node.instances[0].commandClasses;
////					var hasBattery = 0x80 in node.instances[0].commandClasses;
////
////					// Add line with general device info
////					$('body').append($('<tr device="' + nodeId + '" class="device_header"><td class="center not_important">' + nodeId + '</td><td class="icon"></td><td class="right" id="sleeping"></td><td id="awake"></td><td id="operating"></td><td id="battery"></td><td id="interview"></td><td class="geek"><button id="pingDevice"></button></td></tr>'));
//////					nodeTr.find('td.icon').append(device_icon(nodeId));
////				});
//
//			});


		// POST JSON function
		$.postJSON = function(url, data, callback, sync) {
			// shift arguments if data argument was omited
			if ( jQuery.isFunction( data ) ) {
				sync = sync || callback;
				callback = data;
				data = {};
			};
			$.ajax({
				type: 'POST',
				url: url,
				data: data,
				dataType: 'json',
				success: callback,
				error: callback,
				async: (sync!=true),
				beforeSend : function(req) {
					if (server_auth)
						req.setRequestHeader('Authorization', server_auth);
				}
			});
		};
	});

});
