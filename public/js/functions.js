//jshint esversion:6

$(document).on('mousemove', function (e) {
    basket.css('left', e.pageX);
});

$(document).on('touchstart', function (e) {
    basket.css('left', e.pageX);
});


function egg_down(egg) {
    egg_current_position = parseInt(egg.css('top'));   //parse-int is a jQuery script
    egg.css('top', egg_current_position + speed);
}

function check_egg_hits_floor(egg) {
    if (collision(egg, floor)) {
        show_bulls_eye(egg);
        decrement_life();
        return true;
    }
    return false;
}

function show_bulls_eye(egg) {
    bullseye_num = egg.attr('data-bullseye');
    $('#bullseye' + bullseye_num).show();
    hide_bulls_eye(bullseye_num);
}


function hide_bulls_eye(bullseye_num) {
    setTimeout(function () {
        $('#bullseye' + bullseye_num).hide();
    }, 800);
}

function decrement_life() {
    life--;
    life_span.text(life);
}

function set_egg_to_initial_position(egg) {
    egg.css('top', egg_initial_position);
}



function check_egg_hits_basket(egg) {
    if (collision(egg, basket)) {
        egg_top = parseInt(egg.css('top'));
        if (egg_top < basket_top) {
            update_score();
            return true;
        }
    }
    return false;
}

function update_score() {
    score++;
    if (score % 10 === 0 && speed <= max_speed) {
        speed++;
    }
    score_span.text(score);
    score_1.text(score);


    // var currentBG = document.querySelector("#container");
    // document.getElementById("container").classList.toggle("darkBG");




      if(score>=10 && (score%10===0 && score%20!==0) ){
        setTimeout(function(){
          document.querySelector("#container").classList.toggle("darkBG");
        }, 500);
        console.log(score);

      }

      else if(score>10 && score%20===0){
        setTimeout(function(){
          document.querySelector("#container").classList.toggle("darkBG");
        }, 500);
        console.log(score);

      }



}

// function changeBG(){
//   var currentBG = document.querySelector("#container");
//   if(score<10){
//     currentBG.classlist.add("lightBG");
//     console.log(score);
//   }
//
//
//   else{
//     if(score%10===0 && score%20!==0){
//       currentBG.classlist.remove("lightBG");
//       currentBG.classlist.add("darkBG");
//     }
//
//     else if(score%20===0){
//       currentBG.classlist.remove("darkBG");
//       currentBG.classlist.add("lightBG");
//     }
//   }
// }

function stop_the_game() {
    cancelAnimationFrame(anim_id);
    restart.slideDown();
}

restart.click(function () {
    location.reload();
});
