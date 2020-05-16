let toListValue = "ru"
let fromListValue = "auto"
var url = "https://translate.yandex.net/api/v1.5/tr.json/translate";
var str = ["азербайджанский az", "албанский sq", "амхарский am", "английский en", "арабский ar", "армянский hy", "африкаанс af", "баскский eu", "башкирский ba", "белорусский be", "бенгальский bn", "бирманский my", "болгарский bg", "боснийский bs", "валлийский cy", "венгерский hu", "вьетнамский vi", "гаитянский (креольский) ht", "галисийский gl", "голландский nl", "горномарийский mrj", "греческий el", "грузинский ka", "гуджарати gu", "датский da", "иврит he", "идиш yi", "индонезийский id", "ирландский ga", "исландский is", "испанский es", "итальянский it", "казахский kk", "каннада kn", "каталанский ca", "киргизский ky", "китайский zh", "корейский ko", "коса xh", "кхмерский km", "лаосский lo", "латынь la", "латышский lv", "литовский lt", "люксембургский lb", "македонский mk", "малагасийский mg", "малайский ms", "малаялам ml", "мальтийский mt", "маори mi", "маратхи mr", "марийский mhr", "монгольский mn", "немецкий de", "непальский ne", "норвежский no", "панджаби pa", "папьяменто pap", "персидский fa", "польский pl", "португальский pt", "румынский ro", "русский ru", "себуанский ceb", "сербский sr", "сингальский si", "словацкий sk", "словенский sl", "суахили sw", "сунданский su", "тагальский tl", "таджикский tg", "тайский th", "тамильский ta", "татарский tt", "телугу te", "турецкий tr", "удмуртский udm", "узбекский uz", "украинский uk", "урду ur", "финский fi", "французский fr", "хинди hi", "хорватский hr", "чешский cs", "шведский sv", "шотландский gd", "эсперанто eo", "эстонский et", "яванский jv", "японский ja"]; 


$(function() {
  $('#From').on('input',function() {
    var opt = $('option[value="'+$(this).val()+'"]');
    fromListValue = (opt.length ? opt.attr('label') : 'NO OPTION');
  });
});

$(function() {
  $('#To').on('input',function() {
    var opt = $('option[value="'+$(this).val()+'"]');
    toListValue = (opt.length ? opt.attr('label') : 'NO OPTION');
  });
});

function findMatches( input, query) {
  query = query.split(/\s+/);
  var i, parts = [];
  for(i in query) {
    parts.push( '(?=.*(?:^|\\s)' + query[i] + ')');
  }
  
  var re = new RegExp('^' + parts.join(''), 'iug');
  
  var matches = [];
  for(i in str) {
    if( re.test( str[i])) matches.push( str[i]);
  }

  return matches;
}
 $(document).ready(function(){
$('#To').click(function(e) {
	e.preventDefault();

		document.getElementById("To").value = ""

});

$('#From').click(function(e) {
	e.preventDefault();

		document.getElementById("From").value = ""

});

$('#btn_rev').click(function(e) {
	e.preventDefault();
	if (fromListValue != "auto"){
		var fromOld = document.getElementById("From").value
		var toOld = document.getElementById("To").value
		document.getElementById("From").value = toOld
		document.getElementById("To").value = fromOld
		fromOld = fromListValue
		toOld = toListValue 
		fromListValue = toOld
		toListValue = fromOld
		fromOld = document.getElementById("inputs").value
		toOld = document.getElementById("outputs").value
		document.getElementById("inputs").value = toOld
		document.getElementById("outputs").value = fromOld
	}
});

	$('#btn_submit').click(function(e) {
	
	e.preventDefault();
	if ($('#inputs').val()!=""){
		console.log($('#inputs').val() +"     "+ toListValue)	
	}
	var input = $('#inputs').val();
		
		if(fromListValue=="auto" && input != ""){
			url = "https://translate.yandex.net/api/v1.5/tr.json/detect?key=trnsl.1.1.20200512T125729Z.8b1c9a76b74b70c4.ca05a6f3d09c2aea47e57f3ec13f3217c357def9";
			$.getJSON( url, { text: input } )
				.done(function( json ) {
					console.log( "JSON Data: " + json.lang );
					
					var pos = findMatches(str, json.lang+"");
					document.getElementById("From").value = pos.toString().replace(/[^Яа-яЁё]/g, "");
					fromListValue = json.lang+""
					url = "https://translate.yandex.net/api/v1.5/tr.json/translate?lang="+fromListValue+"-"+toListValue+"&key=trnsl.1.1.20200512T125729Z.8b1c9a76b74b70c4.ca05a6f3d09c2aea47e57f3ec13f3217c357def9"
					$.getJSON( url, { text: input } )
					.done(function( json ) {
						document.getElementById("outputs").value = json.text
					})
					.fail(function( jqxhr, textStatus, error ) {
						var err = textStatus + ', ' + error;
						console.log( "Request Failed: " + err);
					});
				})
				.fail(function( jqxhr, textStatus, error ) {
					var err = textStatus + ', ' + error;
					console.log( "Request Failed: " + err);
				});
		}
		else if (fromListValue!="auto" && input != ""){
					url = "https://translate.yandex.net/api/v1.5/tr.json/translate?lang="+fromListValue+"-"+toListValue+"&key=trnsl.1.1.20200512T125729Z.8b1c9a76b74b70c4.ca05a6f3d09c2aea47e57f3ec13f3217c357def9"
					$.getJSON( url, { text: input } )
					.done(function( json ) {
						document.getElementById("outputs").value = json.text
					})	
					.fail(function( jqxhr, textStatus, error ) {
						var err = textStatus + ', ' + error;
						console.log( "Request Failed: " + err);
					});
		}
		else if(input == ""){
			
		}

	});
});
