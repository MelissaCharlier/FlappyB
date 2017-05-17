function Flappy() {
    this.y = 360; // les attributs se définissent dans une fonctions à la place d'une classe 
    this.speed = 0; // définir sa vitesse => V0
}


function Pipe() {
    this.x = 450;
    this.y;
    this.speed = -200;
}

function PipeDown() {
    this.x = 450;
    this.y;
    this.speed = -200;
}

//Définition des méthodes des pipes
Pipe.prototype.move = function () {
    this.x = this.x + this.speed * 0.02;
}

//Vérifie qu'il ne sort pas de l'écran
Flappy.prototype.outBound = function(){
    return this.y < 0 || this.y > 640-50;
}
//Définition des méthodes de flappy
Flappy.prototype.fly = function () {
    //$("#flappy").css("top");
    // récupère la position ' top' de Flappy ( maius util)

    this.speed = -150;
 
}

//Calcule des collisions grâce à la classe "pipe" plusieurs éléments pourront devenir obstacles
Flappy.prototype.collide = function () {
   return $("#flappy").overlaps($(".pipe")).length>0;
}

document.addEventListener("deviceReady", function () {
    var gravity = 300; // pixels/s

    // instentiation de flappybird
    var flappy = new Flappy();

    // instenciation de la "pipe"
    var pipe = new Pipe();
    var random = Math.random() * 100;
    pipe.y = 384 + random;

    // affichage de la "pipe"
    $("#pipe").css({ "top": pipe.y });

    // instenciation de la "pipeDown"
    var pipeDown = new PipeDown();
    var random = Math.random() * 100;
    pipeDown.y = 360 + random;

    // affichage de la "pipe"
    $("#pipeDown").css({ "top": pipeDown.y });

    $(document).click(function () {
        flappy.fly();
    });

    //var bg_pos = 0;
    var timer = 0; // Mise ne place des frame ( rafraichissement de la page pour mimer la technique cinéma (60images/s)
    timer = window.setInterval(function () {
        if (flappy.collide() || flappy.outBound()){
            console.log("outch!! ");
            clearInterval(timer); // permet de "killer" le timer => gameover
        };
        // animer le background via le js 
        //bg_pos = bg_pos - 0.5;
        //$("body").css({"background-position-x": bg_pos +"px"});
        flappy.speed = flappy.speed + gravity * 0.020;  // calcul de la vitesse de Flappy toutes les 20 millisecondes
        flappy.y = flappy.y + 0.020 * flappy.speed;   //=> on modifie la position de Flappy par rapport à sa vitesse
        pipe.move();
        // affichage de "flappybird"
        $("#flappy").css({ "top": flappy.y });
        $("#pipe").css({ "left": pipe.x });
        if (pipe.x < -100) {
            pipe.x = 400;
            pipe.y = 384 + Math.random() *100;
            $("#pipe").css({ "top": pipe.y });
        }
        $("#pipeDown").css({ "left": pipeDown.x });
        if (pipeDown.x < -100) {
            pipeDown.x = 400;
            pipeDown.y = pipe.y -200 ;
        }
    }, 20) // 20 = millième de seconde ( temps avant rafraichissement)
}, true
)