var user_scores = [1, 1, 1, 1, 1];
var hotels = null 
var hotel_valid_array = null

// load json file into variable hotels
$.getJSON( "static/final.json", function( data ) {
	hotels = data  
});


// update sentiment scores array
function updateScores(index, score) {
	user_scores[index] = score;
}

// check whether hotel qualifies on given scores
function isHotelValid(hotel_index, user_scores) {
	hotel_scores = []
	for (var i=0; i<hotels.length; i++) {
		if (hotels[i].hotelindex == hotel_index) {
			hotel_scores.push(hotels[i].score);	
		}
	}
	if ((hotel_scores[0] >= user_scores[0]) &&
		(hotel_scores[1] >= user_scores[1]) &&
		(hotel_scores[2] >= user_scores[2]) &&
		(hotel_scores[3] >= user_scores[3]) &&
		(hotel_scores[4] >= user_scores[4])
		) {
		return 1;
	}
	else {
		return 0;
	}
}

// create valid hotels array
function hotelValidArray() {
	valid_hotel = []
	for (var i=0; i<50; i++) {
		valid_hotel.push(isHotelValid(i, user_scores));
	}
	console.log(valid_hotel)

	for (var j=0; j<valid_hotel.length; j++) {
		hotelj = "#hotel" + j
		
		if (valid_hotel[j] == 1) {
		  d3.select(hotelj)
			.attr({
		  	style: "opacity: 1"
		  });
		}
		else {
			d3.select(hotelj)
			.attr({
		  	style: "opacity: 0.05"
		  });
		}
	}
}

// load hotel thumbnails (html a tags)
function loadHotels(){
	d3.csv("static/hotels.csv", function(error, data) {
	    data.forEach(function(d) {
	        d.hotelindex = d.hotelindex;
	        d.hotelname = d.hotelname;
	        d.price = d.price;
    	});

      d3.json("static/vegas.json", function(error, vegas) {
          vegas.children.forEach(function(d, i) {
          	d.hotelname = data[i].hotelname
          	d.price = data[i].price
          // create tooltip
		var tips = d3.select("#section").append("div")   
		    .attr("class", "tooltip")               
		    .style("opacity", 0);

          d3.select("#section")
            .append("a")
            .attr("href", d.url)
            .append("img")
            .attr({
              id: "hotel"+i,
              height: 65,
              width:65,
              style: "opacity: 1",
              src: d.thumbnail
            })
            .on("mouseover", function(d) {
            	if(d3.select(this).style("opacity") == 1) {  
	            	d3.select(this)
		      			.attr({
		      				height: 70,
		      				width: 85
		      			});
		            tips.style("opacity", .9);
		            tips .html(function(d) {return data[i].hotelname + "<br/>"  + data[i].price})  
		                .style("left", (d3.event.pageX) + "px")     
		                .style("top", (d3.event.pageY-60) + "px"); 
		        }
            })
            .on("mouseout", function(d) { 
            	d3.select(this)
	      			.attr({
	      				height: 65,
	      				width: 65
	      			});      
                tips.transition()        
                	.duration(300)      
                	.style("opacity", 0);
            })             
          });
      });
	});
}
