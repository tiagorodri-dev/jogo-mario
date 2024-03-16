const main = document.querySelector(".main");
const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const clouds = document.querySelector(".clouds");
const jogar = document.querySelector(".jogar");
const contagem = document.querySelector(".contagem");
let seconds = 6;

function contagemRegressiva() {
    if (seconds <= 0) {
        clouds.src = './assets/clouds.png';
        mario.src = './assets/mario-gif.gif';
        pipe.src = './assets/pipe.png';

        const pular = () => {
            mario.classList.add("pular");
            setTimeout(()=> {
                mario.classList.remove("pular")
            }, 500)

            const audioPulo = new Audio('./audio/pulo.mp3');
            audioPulo.addEventListener('canplaythrough', function() {
                audioPulo.play();
            });
        }

        const loop = setInterval(() => {
            const pipePosition = pipe.offsetLeft;
            const cloudsPosition = clouds.offset;
            const marioPosition = +window.getComputedStyle(mario).bottom.replace("px", "")

            // if(cloudsPosition.offset) {
            //     clouds.style.animation = 'none';
            //     clouds.style.top = `${cloudsPosition}px`
            // }

            if (pipePosition <= 100 && pipePosition > 0 && marioPosition < 80) {

                pipe.style.animation = 'none';
                pipe.style.left = `${pipePosition}px`

                mario.style.animation = 'none';
                mario.style.bottom = `${marioPosition}px`

                mario.src = "./assets/game-over.png";
                mario.style.width = "100px";
                mario.style.marginLeft = "23px";

                const audioGameOver = new Audio('./audio/game-over.mp3');
                    audioGameOver.addEventListener('canplaythrough', function() {
                audioGameOver.play();
            });
                clearInterval(loop)
            }
        }, 10)

        document.addEventListener("keydown", pular);
    }

    else {
        mario.src = 'none';
        pipe.src = 'none';
        clouds.src = 'none';

        seconds--;
        contagem.textContent = 'Começando em ' + seconds
        setTimeout(contagemRegressiva, 1000)

        if(seconds == 0) {
            contagem.style.transition = '0.4'
            contagem.style.display = 'none'
        }
    }
}

jogar.addEventListener("click", () => {
    location.reload(true)
});

contagemRegressiva();