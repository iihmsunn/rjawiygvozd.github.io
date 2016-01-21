var pushkin = $("<div class='pushkin'></div>");
var bloodpool = $("<div class='bloodpool'></div>");
var firesnd = $("<audio src='FIRE.mp3'>");
var score = 0;
var panel = $(".panel");
var scorehtml = ' | Всего Пушкиных убито: <p class="score">0</p>';
var timerhtml = 'Время: <p class="timer">0</p>';
var perminutehtml = ' | Убито Пушкиных в минуту: <p class="perminute">0</p>';
var scorevalue = $("p.score");
var content = $(".gamecontent");

var count=0;

var counter=setInterval(timer, 1000);

function timer()
{
  count=count+1;
  $(".timer").text(count);
  $(".perminute").text(count/60 > 1 ? Math.round(score/(count/60)*100)/100 : score);
}

function getRandomInt(min, max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomPosition(){
	var result = [];
	result.push(getRandomInt(0, $(window).width() - 200));
	result.push(getRandomInt(0, $(window).height() - 249));
	return result;
}

function movePushkin(pushkin){
	content.append(pushkin);
	pushkin.click(function(){
		Shot($(this), bloodpool.clone());
	});
	var position = getRandomPosition();
	pushkin.css('left', position[0]);
	pushkin.css('top', position[1]);
	pushkin.css('display', 'block');

}

function Shot(pushkin, bloodpool){
	pushkin.off('click');
	content.append(bloodpool);
	bloodpool.css('left', pushkin.css('left'));
	bloodpool.css('top', pushkin.css('top'));
	firesnd[0].pause();
	firesnd[0].currentTime = 0;
	firesnd[0].play();
	bloodpool.css('display', 'block');
	score += 1;
	$("p.score").text(score);
	pushkin.animate({opacity: 1}, 1000);
	bloodpool.animate({opacity: 1}, 1000);
	pushkin.fadeOut(500, function(){$(this.remove())});
	bloodpool.fadeOut(500, function(){$(this.remove())});
	movePushkin(pushkin.clone());
}

$(document).ready(function(){
	panel.append(timerhtml);
	panel.append(perminutehtml);
	panel.append(scorehtml);
	content.append(firesnd);
	movePushkin(pushkin.clone());
});
