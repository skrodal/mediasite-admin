/* Charts.js global config */

// Layout
Chart.defaults.global.responsive = true;
Chart.defaults.global.maintainAspectRatio = true;
// Hide stuff
Chart.defaults.global.legend = false;
// Fonts
Chart.defaults.global.defaultFontSize = 12;
Chart.defaults.global.defaultFontColor = "#333";
Chart.defaults.global.defaultFontFamily = "colfaxLight, 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
// Chart line styling
Chart.defaults.global.elements.line.tension = 0.4;
Chart.defaults.global.elements.line.borderCapStyle = 'round';
Chart.defaults.global.elements.line.borderJoinStyle = 'round';
Chart.defaults.global.elements.line.fill = true;
Chart.defaults.global.elements.line.borderColor = 'rgba(0,0,0,0.1)';
Chart.defaults.global.elements.line.borderWidth = 1;
// Chart point styling
Chart.defaults.global.elements.point.borderColor = "rgba(111,111,111,0.4)";
Chart.defaults.global.elements.point.borderWidth = 1;
Chart.defaults.global.elements.point.hoverRadius = 7;
Chart.defaults.global.elements.point.backgroundColor = "#666";
Chart.defaults.global.elements.point.hoverBorderWidth = 1;
Chart.defaults.global.elements.point.radius = 1;
Chart.defaults.global.elements.point.hitRadius = 14;
// Tooltips
Chart.defaults.global.tooltips.titleFontFamily = "colfaxRegular, 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
Chart.defaults.global.tooltips.titleFontSize = 16;
Chart.defaults.global.tooltips.bodyFontFamily = "colfaxRegular, 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
Chart.defaults.global.tooltips.bodyFontSize = 14;

/* DataTables.js global config */
var dataTablesLanguage =
{
	"emptyTable":     "Ingen informasjon tilgjengelig",
	"info":           "Viser _START_ til _END_ av _TOTAL_ innslag",
	"infoEmpty":      "Viser 0 til 0 av 0 innslag",
	"infoFiltered":   "(filtrert fra totalt _MAX_ innslag)",
	"infoPostFix":    "",
	"thousands":      ",",
	"lengthMenu":     "Vis _MENU_  innslag per side",
	"loadingRecords": "Henter...",
	"processing":     "Vennligst vent...",
	"search":         "Søk: ",
	"zeroRecords":    "Fant ingen innslag",
	'paginate': {
		'first': 'F&oslash;rste',
		'previous': '&larr;',
		'next': '&rarr;',
		'last': 'Siste'
	}
}