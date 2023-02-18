const timerNpc = document.getElementById('timerNpc');
const timer = document.getElementById('TIMER');
const timerHidden = document.getElementById('timer-hidden');
const progressBar = document.getElementById('progressBar');
const progressArea = document.getElementById('progress-area');
const remainingTime = document.getElementById('remainingTime');
const timerOption = document.getElementById('timer-option');
const timerCancelBtn = document.getElementById('timerCancelBtn');
let ticTac;
let reset;

function timerStart() {
    const timerNodeList = document.getElementsByName('timer');
    timerNodeList.forEach((node) => {
      if(node.checked)  {
        const timerSet = Number(node.value);
        let count = -1;
        counting(); // start 눌렀을 때 바로 타이머 보이도록
        ticTac = setInterval(counting, 1000);
        reset = setInterval(() => count=-1, timerSet*999); //왜 화살표 함수로?, 1000으로 했을 때 첫 주기에서 1초 더 홀딩함(4초 기다리고 바뀜)
        setInterval(clear, 2 * 60 * 60 * 1000);
        function counting(){
            let remainingSeconds = timerSet - (++count); 
            let minutes = ('0' + Math.floor(remainingSeconds/60)).slice(-2);
            let seconds = ('0' + Math.floor(remainingSeconds%60)).slice(-2);
            remainingTime.innerText = `${minutes}:${seconds}`;
        }
        progressBar.classList.add(`on${timerSet}s`);
        timerOption.style.display = 'none';
        progressArea.style.display = 'block';
    }
}) 
}

function clear(){
    clearInterval(ticTac);
    clearInterval(reset);
    remainingTime.innerText = '';
}

function timerCancel(){
    timerOption.style.display = 'block';
    progressArea.style.display = 'none';
    clear();
    }

function popUpTimer(){
    timer.style.backgroundImage = "url('img/OptionMenu5.backgrnd.png')";
    if(timer.style.display == 'block'){
        timer.style.display = 'none';
    } else{
        timer.style.display = 'block';
    }
}

timerNpc.addEventListener('click', popUpTimer);
timer.style.display = 'none';


