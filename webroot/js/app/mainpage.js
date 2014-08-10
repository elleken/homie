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

//	'graphite_pubsub',
//	'graphite_utilities',
//	'graphite_responsive',

	//Plugins
	'fastclick',
//	'triggerPath',
	'chartjs',
	'c_chart',
	'moment'

], function ( $, G, text, underscore, fastclick, chartjs, c_chart, moment) {

	'use strict';

	// //////////////////////////////////////////////////////////
	// Private utilities
	// /////////////////////////////////////////////////////////

	/*
	 * DOM READY
	 */
	$(function () {
		var ZWaveAPIData = { updateTime: 0 };


		// ADD CHARTS
		if ( $('.c_chart').length>0 ) {
			require(["text!../json/logAM2302.json"], function(dataAM2302) {
				var temperatureChart = G.initialize('c_chart', {
					el: $('#temperatureChart'),
					scaleLabel: "<%=value%> ℃",
					data: function () {
						var labels = [],
							temperatures = [];
						var data = $.parseJSON(dataAM2302);
						_.each(data, function (object, i) {
							var dateMoment = moment(object.timestamp).format('D-M-YY HH:MM');
							if (i == 0 || i == data.length - 1 || i % 6 == 0) {
								labels.push(dateMoment);
							} else {
								labels.push('.')
							}
							temperatures.push(parseFloat(object.temperature));
						})
						labels.reverse();
						temperatures.reverse();
						var temperatureDataSet = [
							{
								label: "Temperature",
								fillColor: "rgba(220,220,220,0.2)",
								strokeColor: "rgba(220,220,220,1)",
								pointColor: "rgba(220,220,220,1)",
								pointStrokeColor: "#fff",
								pointHighlightFill: "#fff",
								pointHighlightStroke: "rgba(220,220,220,1)",
								data: temperatures
							}
						];
						//
						var temperatureChartData = {
							labels: labels,
							datasets: temperatureDataSet
						};
						return temperatureChartData;
					}
				});

				var humidityChart = G.initialize('c_chart', {
					el: $('#humidityChart'),
					scaleLabel: "<%=value%> %",
					data: function () {
						var labels = [],
							humidities = [];

						var data = $.parseJSON(dataAM2302);
						_.each(data, function (object, i) {
							var dateMoment = moment(object.timestamp).format('D-M-YY HH:MM');
							if (i == 0 || i == data.length - 1 || i % 6 == 0) {
								labels.push(dateMoment);
							} else {
								labels.push('.')
							}
							humidities.push(parseFloat(object.humidity));
						})
						labels.reverse();
						humidities.reverse();
						var humidityDataSet = [
							{
								label: "Temperature",
								fillColor: "rgba(220,220,220,0.2)",
								strokeColor: "rgba(220,220,220,1)",
								pointColor: "rgba(220,220,220,1)",
								pointStrokeColor: "#fff",
								pointHighlightFill: "#fff",
								pointHighlightStroke: "rgba(220,220,220,1)",
								data: humidities
							}
						];
						//
						var humidityChartData = {
							labels: labels,
							datasets: humidityDataSet
						};
						return humidityChartData;
					}
				});
			});
		}
		// ADD Current temp and humid.
		$.getJSON( "json/getAM2302.json", function( data ) {
			$('#currentTemp').text(data.temperature + ' ℃');
			$('#currentHumid').text(data.humidity + ' %');
		});

		// Init ZWaveAPIData structure
//		$.triggerPath.init(ZWaveAPIData);
//		var miliseconds = new Date(0);




//http://192.168.1.41:8083/
		//$.postJSON('/ZWaveAPI/Data/' + ZWaveAPIData.updateTime, handleDataUpdate, sync);


//		$.getJSON( "http://192.168.1.41/json/da", function( data ) {
//			console.log(data);
//
//		});


//		var now = Math.round((new Date()).getTime() / 1000);
		var devices = [];
		$.getJSON( "http://192.168.1.41:8083/ZWaveAPI/Data/0", function( data ) {
			ZWaveAPIData = data;
			_.each(ZWaveAPIData.devices, function (node, nodeId) {
				var controllerNodeId = ZWaveAPIData.controller.data.nodeId.value;
				if (nodeId == 255 || nodeId == controllerNodeId)
				// We skip broadcase and self
					return;
				var nodeObj = {};

				// Device status and battery
				nodeObj.basicType = node.data.basicType.value;
				nodeObj.genericType = node.data.genericType.value;
				nodeObj.specificType = node.data.specificType.value;
				nodeObj.isListening = node.data.isListening.value;
				nodeObj.isFLiRS = !nodeObj.isListening && (node.data.sensor250.value || node.data.sensor1000.value);
				nodeObj.hasWakeup = 0x84 in node.instances[0].commandClasses;
				nodeObj.hasBattery = 0x80 in node.instances[0].commandClasses;
				// DO stuff width device.
				devices.push(node);
				console.log(node.data.name);
				

				$('body').prepend('<div>'+node.data.name+'</div>');
			});


		});
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
