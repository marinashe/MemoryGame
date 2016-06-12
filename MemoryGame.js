"use strict";

const pictures = ["fa-anchor", "fa-leaf", "fa-key", "fa-eye", "fa-rocket",
            "fa-umbrella", "fa-plane", "fa-github-alt", "fa-motorcycle", "fa-birthday-cake"];
var card1 = "";
var player = '';
var clickable = true;

function change_player() {
    $('div.player1 i.hand-red').toggleClass('no-display');
    $('div.player2 i.hand-red').toggleClass('no-display');
    player = player === 'p1' ? 'p2' : 'p1';
}

function add_points () {
    const el = $('[id=' + player + ']');
    const points = +el.html();
    el.html( points + 10 );
    isEnd();
}

function closeMessage() {
    $("#win").hide(500);

}

function isEnd () {
    const p1 = +$('[id="p1"]').html();
    const p2 = +$('[id="p2"]').html();
    var winner = '';
    if ( p1 + p2  === 100 ) {
        winner = p1 === p2 ? "It's a tie!" : (p1 > p2 ? "Player 1 Win!" : "Player 2 Win!");
        $("strong").html(winner);
        if (player === 'p1') {
            $('div.player1 i.hand-red').toggleClass('no-display');
        } else {
            $('div.player2 i.hand-red').toggleClass('no-display');
        }
        $('div.tile').remove();
        $('[id="p1"]').html('0');
        $('[id="p2"]').html('0');
        $("#win").show();
        $('button#start-game').attr('disabled', false);

    }
}

jQuery.fn.shuffle = function () {
    var j;
    for (var i = 0; i < this.length; i++) {
        j = Math.floor(Math.random() * this.length);
        $(this[i]).before($(this[j]));
    }
    return this;
};


function tile_click () {
    if (!clickable) {
        return;
    }
    var el = $(this).find($("span"));

    if (!card1) {
        el.toggleClass('text-black');
        card1 = el.attr('class');
        return;
    }

    clickable = false;
    el.toggleClass('text-black');
    if (card1 !== el.attr('class')) {
        card1 = "";
         const els = $("span.text-black");
        setTimeout(function () {
            els.toggleClass('text-black');
            change_player();
            clickable = true;
        }, 500
        );

    } else {
        card1 = "";
        const els = $("span.text-black");
        setTimeout(function () {
            els.toggleClass('text-black');
            els.parent().addClass('no-border').unbind();
            clickable = true;
        }, 500
        );
        add_points();
    }
}

$('button#start-game').click(function() {
    player = 'p1';
    for (var i = 0; i < 10; i++) {
        let el = $('<div class="tile"></div>');
        el.append($("<span class='fa fa-4x span-in-tile'></span>").addClass(pictures[i]));
        el.appendTo($("div.cards"));
        const new_el = el.clone();
        new_el.appendTo($("div.cards"));
        el.click(tile_click);
        new_el.click(tile_click);
    }
    $('div.tile').shuffle();
    $(this).attr('disabled', true);
    $('div.player1 i.hand-red').toggleClass('no-display');
});

