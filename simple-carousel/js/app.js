// jQuery wrapper
$(function(){

	// next image function
	$(".next").on("click",function(e){

		var currentImg = $(".img-show");
		var nextImg = currentImg.next();

		if(nextImg.length == 0){
			nextImg = $("#carousel-inner img").first();
		}

		currentImg.removeClass("img-show").addClass("img-hide").css("z-index", -10);
		nextImg.addClass("img-show").removeClass("img-hide").css("z-index", 20);
		$("#carousel-inner img").not([currentImg,nextImg]).css("z-index", 1);

		e.preventDefault();
	});

	// previous image function
	$(".prev").on("click",function(e){

		var currentImg = $(".img-show");
		var nextImg = currentImg.prev();

		if(nextImg.length == 0){
			nextImg = $("#carousel-inner img").last();
		}

		currentImg.removeClass("img-show").addClass("img-hide").css("z-index", -10);
		nextImg.addClass("img-show").removeClass("img-hide").css("z-index", 20);
		$("#carousel-inner img").not([currentImg,nextImg]).css("z-index", 1);

		e.preventDefault();
	});

	// click thumbnail function
	$(".tn").on("click",function(e){

		var currentImg = $("#carousel-inner img").eq($(this).index());
		currentImg.addClass("img-show").removeClass("img-hide").css("z-index", 20);
		$("#carousel-inner img").not(currentImg).removeClass("img-show").addClass("img-hide").css("z-index", 1);

		e.preventDefault();
	});

});//end wrapper
