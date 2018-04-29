$(document).ready(function(){
	$('#getWeather').click(function(){
		var city = $('#city').val();
		
		if(city != ''){
			$.ajax({
				url: "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric" + "&appid=23ec35c3a25064f8f0e1d4b5d676bce9",
				type:"GET",
				dataType:"jsonp",
				success:function(data){
					var widget = show(data);
					$('#city').val('');
				}
			});
		}else{
			$('#error').html("<div class='alert alert-danger text-center' id='errorCity'><a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>Field cannot be empty</div>");
		}
	});
});

function show(data){
	var show = document.getElementById('show');
	show.innerHTML = "";
	var cityname = document.getElementById('cityname');
	cityname.innerHTML = "<h5 class='text-center'> Weather forecast for " + data.city.name + ", " + data.city.country + "</h5><hr>";
	
	for(var i = 0; i < data.list.length; i=i+8){
		show.innerHTML +="<div class='p-2'><span><strong> Weather</strong>: "+ data.list[i].weather[0].main + "</span></br>" +	
			"<span><strong> Temperature</strong>: " + data.list[i].main.temp + "&deg;C</span></br>" +			
			"<span><img src='http://openweathermap.org/img/w/"+ data.list[i].weather[0].icon + ".png'>" + data.list[i].weather[0].description + "</span></br>" +			
			"<span><strong> Min. Temperature</strong>: " + data.list[i].main.temp_min + "&deg;C</span></br>" +
			"<span><strong> Max. Temperature</strong>: " + data.list[i].main.temp_max + "&deg;C</span></br>" +
			"<span><strong> Humidity</strong>: " + data.list[i].main.humidity + "%</span></br>" +
			"<span><strong> Sea Level</strong>: " + data.list[i].main.sea_level + " hPa</span></br>" +
			"<span><strong> Pressure</strong>: " + data.list[i].main.pressure + " hPa</span></br>" +
			"<span><strong> Date</strong>: " + data.list[i].dt_txt + "</span></div>";
	}
}