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
	'triggerPath',
	'chartjs',
	'c_chart',
	'moment'

], function ( $, G, text, underscore, fastclick, triggerPath, chartjs, c_chart, moment) {

	'use strict';

	// //////////////////////////////////////////////////////////
	// Private utilities
	// /////////////////////////////////////////////////////////

	/*
	 * DOM READY
	 */
	$(function () {
		var ZWaveAPIData = { updateTime: 0 };
		var am2302DataPath = "https://api.mongolab.com/api/1/databases/sensors/collections/am2302?apiKey=_B1pMzQhYWpDfAkyNd_KCadicOdSHNw2";
		var noOfMeasures = 70;
		var renderCharts = function(data){
			var temperatureChart = G.initialize('c_chart', {
				el: $('#temperatureChart'),
				scaleLabel: "<%=value%> ℃",
				data: function () {
					var labels = [],
						temperatures = [];
					_.each(data, function (object, i) {

						var dateMoment = moment(object.timestamp).format('D-M-YY HH:mm');
						if (i == 0 || i == data.length - 1 || i % noOfMeasures == 0) {
							labels.push(dateMoment);
							temperatures.push(parseFloat(object.temperature));
						}
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

					_.each(data, function (object, i) {
						var dateMoment = moment(object.timestamp).format('D-M-YY HH:MM');
						if (i == 0 || i == data.length - 1 || i % noOfMeasures == 0) {
							labels.push(dateMoment);
							humidities.push(parseFloat(object.humidity));
						}
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
		}
		var Am2302data = null;
		// ADD CHARTS
		if ( $('.c_chart').length>0 ) {
			var sensorDataPath = 'http://192.168.1.44:28017/sensors/am2302/';
			$.getJSON( am2302DataPath, function( dataAM2302 ){
				 Am2302data = dataAM2302;
				renderCharts(dataAM2302);
				addCurrentMeasures(dataAM2302);
			});
		}

		// ADD Current temp and humid.
		var addCurrentMeasures = function(data){

			var lastEntry = data[data.length-1];

			$('#currentTemp').text(lastEntry.temperature + ' ℃');
			$('#currentHumid').text(lastEntry.humidity + ' %');
		}



	});

});
