var as;
var audio;
var songs = new Array();
var cartSongs = new Array();
var cartSubtotal = 0;
var cartDiscount = 0;
var carTotal = 0;

$(document).ready(function () {
    populateSongs();
    displaySongs();

    setSong(0);

    as = audiojs.createAll();
    audio = as[0];
    audio.setVolume(.50);

    $("#music-list table td").click(function () {
        if(!$(this).hasClass("buy") && !$(this).hasClass("bought")) {
            setSong($(this).parent().attr("data-id"));
            audio.play();
        }

        if($(this).hasClass("buy")) {
            $(this).removeClass("buy");
            $(this).addClass("bought");
            $(this).find("i").removeClass("fa-plus-square");
            $(this).find("i").addClass("fa-minus-square");
            addToCart($(this).parent().attr("data-id"));
        } else if($(this).hasClass("bought")) {
            $(this).removeClass("bought");
            $(this).addClass("buy");
            $(this).find("i").removeClass("fa-minus-square");
            $(this).find("i").addClass("fa-plus-square");
            removeFromCart($(this).parent().attr("data-id"));
        }
    });

    $("#volume").slider({
        min: 0,
        max: 100,
        value: 50,
        range: "min",
        animate: true,
        slide: function (event, ui) {
            audio.setVolume(ui.value / 100);
        }
    });
});

function addToCart(index){
    cartSongs.push(songs[index]);
    cartSubtotal = cartSubtotal + songs[index].price;
    updateCart();
}

function removeFromCart(index) {
    cartSongs.splice(findIndexOfSongInCart(songs[index].title),1);
    cartSubtotal = cartSubtotal - songs[index].price;
    updateCart();
}

function findIndexOfSongInCart(title){
    var index = 0;
    for(var i=0; i < cartSongs.length; i++) {
        if(title == cartSongs[i].title)
        {
            index = i;
        }
    }
    return index;
}

function printSongsInCart(){
    for(var i=0; i < cartSongs.length; i++) {
        console.log(i +": " + cartSongs[i].title);
    }
}

function updateCart() {
    cartTotal = cartSubtotal - cartDiscount;
    if(cartTotal < 0) {
        cartTotal = 0;
    }

    $("#subtotal").html(cartSubtotal.toFixed(2) + "$");
    $("#discount").html("-"+ cartDiscount.toFixed(2) + "$");
    $("#total").html(cartTotal.toFixed(2) + "$");

    printSongsInCart();
}

function Song(title, artist, album, songpath,imagepath) {
    this.title = title;
    this.artist = artist;
    this.album = album;
    this.songpath = songpath;
    this.price = 0.99;
    if(imagepath != null) {this.imagepath = imagepath; }
    else { this.imagepath = "http://placehold.it/200x200";}
}

function setSong(index) {
    $("#player img").attr("src", songs[index].imagepath);
    $("#audio").attr("src", songs[index].songpath);
    $("#song-title").html(songs[index].title);
    $("#song-artist").html("by " + songs[index].artist);
    $("#song-album").html(songs[index].album);
}

function populateSongs() {
    //TODO: Server-side population, need php
    songs[0] = new Song("Give My Regards", "Mitis", "Give My Regards", "./music/Give My Regards.mp3","./images/mitisart.jpg");
    songs[1] = new Song("In Congress", "Mitis", "Give My Regards", "./music/In Congress.mp3","./images/mitisart.jpg");
    songs[2] = new Song("Modify", "Mitis", "Give My Regards", "./music/Modify.mp3","./images/mitisart.jpg");
    songs[3] = new Song("Burn", "Subvibe", "This is Subvibe", "./music/Burn.mp3","./images/this_is_subvibe.jpg");
    songs[4] = new Song("Velocity", "Subvibe", "This is Subvibe", "./music/Velocity.mp3","./images/this_is_subvibe.jpg");
    songs[5] = new Song("Day N Nite", "Kid Cudi", "Man on the Moon", "./music/Day N Nite.mp3","./images/Man_On_The_Moon.jpg");
    songs[6] = new Song("Sky Might Fall", "Kid Cudi", "Man on the Moon", "./music/Sky Might Fall.mp3","./images/Man_On_The_Moon.jpg");
}

function displaySongs() {
    for (var i = 0; i < 7; i++) {
        $("#music-list table").append("<tr class='song' data-id='"+ i +"'><td><a href='#'>" + songs[i].title + "</a></td><td>" + songs[i].artist + "</td><td>"+ songs[i].price + "$</td><td class='buy'><i class='fa fa-plus-square fa-2x'></i></td></tr>");
    }
}
