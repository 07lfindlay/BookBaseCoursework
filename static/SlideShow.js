var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
    var i,
        slides = document.getElementsByClassName("mySlides"),
        dots = document.getElementsByClassName("dot");

    if (n === undefined) {
        n = ++slideIndex;
    }
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

var recIndex = 1;
showRecs(recIndex);

// Next/previous controls
function plusRecs(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentRec(n) {
  showRecs(recIndex = n);
}

function showRecs(n) {
    var i,
        recs = document.getElementsByClassName("myRecs"),
        recdots = document.getElementsByClassName("recdot");

    if (n === undefined) {
        n = ++recIndex;
    }
    if (n > recs.length) {
        recIndex = 1;
    }
    if (n < 1) {
        recIndex = reces.length;
    }
    for (i = 0; i < recs.length; i++) {
       recs[i].style.display = "none";
    }
    for (i = 0; i < recdots.length; i++) {
        recdots[i].className = recdots[i].className.replace(" active", "");
    }
    recs[recIndex - 1].style.display = "block";
    recdots[receIndex - 1].className += " active";
}