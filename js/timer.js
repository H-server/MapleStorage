const timerNpc = document.getElementById('timerNpc');
const timer = document.getElementById('TIMER');
const timerHidden = document.getElementById('timer-hidden');
const progressBar = document.getElementById('progressBar');
const progressBar2 = document.getElementById('progressBar2');
const progressArea = document.getElementById('progress-area');
const progressArea2 = document.getElementById('progress-area2');
const remainingTime = document.getElementById('remainingTime');
const remainingTime2 = document.getElementById('remainingTime2');
const timerOption = document.getElementById('timer-option');
const timerCancelBtn = document.getElementById('timerCancelBtn');
const timerStartBtn = document.getElementById('timerStartBtn');
const totalTime = document.getElementById('totalTime');
const tictacArea = document.getElementById('tictac-area');
const resultArea = document.getElementById('result-area');
let ticTac;
let ticTac2;
let reset;
let reset2;
let resetTotalCount;
let clearTimer;

const result_startTime = document.getElementById('result-starttime');
const result_stopTime = document.getElementById('result-stoptime');
const result_totalCount = document.getElementById('result-totalcount');
const result_expCoupon = document.getElementById('result-expcoupon');
const result_item = document.getElementById('result-item');

let memoryStart;
let memoryStop;
let memoryTotalTime;
let memoryExpcoupon = 0;
let memoryItem = 0;

const resultInfo = document.getElementsByClassName('resultInfo');
const soundStart = new Audio('soundEffect/Start.mp3');


function timerStart() {
    soundStart.play();

    clickCursor.style.display = 'none';
    timerStartBtn.style.cursor = '';

    timerCancelBtn.disabled = false;
    timerCancelBtn.className = 'ActivationCancel waitingClick3';
    const waitingClick3 = document.querySelectorAll('.waitingClick3');
    addClickCursor(waitingClick3);

    timerStartBtn.disabled = true;
    timerStartBtn.style.backgroundImage = '';
    timerStartBtn.className = 'DeactivationStart';


    clearTimer = setTimeout(clear, 2 * 60 * 60 * 1000);
    memoryStart = clock.innerText;

//?????? ?????????
    let soundEffect;
    const timerNodeList = document.getElementsByName('timer');
    timerNodeList.forEach((node) => {
      if(node.checked)  {

        progressArea.style.display = 'block';

        const timerSet = Number(node.value);
        let count = -1;
        
        counting(); // start ????????? ??? ?????? ????????? ????????????
        progressBar.classList.add(`on${timerSet}s`);
        soundEffect = new Audio(`soundEffect/sound${timerSet}.mp3`);
        ticTac = setInterval(counting, 1000);
        reset = setInterval(() => {count=-1; soundEffect.play(); memoryExpcoupon+=1; }, timerSet*999); //??? ????????? ??????????, 1000?????? ?????? ??? ??? ???????????? 1??? ??? ?????????(4??? ???????????? ??????)
        
        function counting(){
            let remainingTotalSeconds = timerSet - (++count);
            
            let remainingMinutes = ('0' + Math.floor(remainingTotalSeconds/60)).slice(-2);
            let remainingSeconds = ('0' + Math.floor(remainingTotalSeconds%60)).slice(-2);
            
            remainingTime.innerText = `?????? ????????????: ${remainingMinutes}:${remainingSeconds}`;
            
        }
        timerOption.style.display = 'none';
        tictacArea.style.display = 'block';
    }
}) 
if(remainingTime.innerText == ''){
    progressArea.style.display = 'none';
}

//??? ???????????? ?????????
let totalCount = -1;
resetTotalCount = setInterval(totalCounting, 1000);
totalCounting();
function totalCounting(){
    totalCount += 1;
    let countUpMinutes = ('0' + Math.floor(totalCount/60)).slice(-2);
    let countUpSeconds = ('0' + Math.floor(totalCount%60)).slice(-2);
    totalTime.innerText = `????????????: ${countUpMinutes}:${countUpSeconds}`
}


//???????????? ?????????
    const timerGetItemNodeList = document.getElementsByName('get-item');
    timerGetItemNodeList.forEach((node) => {
        if(node.checked){
            soundEffect = new Audio('soundEffect/soundOverlap.mp3');


            progressArea2.style.display = 'block';
            let remainingTotalSeconds2 = 101;
            progressBar2.classList.add(`on100s`);
            const soundEffect2 = new Audio(`soundEffect/sound100.mp3`);
            ticTac2 = setInterval(counting2, 1000);
            counting2();
            reset2 = setInterval(() => {remainingTotalSeconds2=101; soundEffect2.play(); memoryItem += 1;}, 100*999);
            function counting2(){
                --remainingTotalSeconds2;
                let remainingMinutes2 = ('0' + Math.floor(remainingTotalSeconds2/60)).slice(-2);
                let remainingSeconds2 = ('0' + Math.floor(remainingTotalSeconds2%60)).slice(-2);
                remainingTime2.innerText = `?????? ????????????: ${remainingMinutes2}:${remainingSeconds2}`;
                }
            } else {
                progressArea2.style.display = 'none';
            }
        }
        )

        timerOption.style.display = 'none';
        tictacArea.style.display = 'block';
    }

function timerCancel(){
    tictacArea.style.display = 'none';
    resultArea.style.display = 'block';
    cancel();
    clickCursor.style.display = 'none';
    timerCancelBtn.style.cursor = '';
} 

function clear(){
    const soundFinish = new Audio('soundEffect/sound7200.mp3')
    soundFinish.play();
    cancel();
    tictacArea.style.display = 'none';
    resultArea.style.display = 'block';
}

function cancel(){
    memoryStop = clock.innerText;
    memoryTotalTime = totalTime.innerText;
    timerResult();
    clearInterval(clearTimer);
    clearInterval(ticTac);
    clearInterval(ticTac2);
    clearInterval(reset);
    clearInterval(reset2);
    clearInterval(resetTotalCount);
    progressBar.className = '';
    remainingTime.innerText = '';
    progressBar2.className = '';
    remainingTime2.innerText = '';
    totalTime.innerText = '';

    timerCancelBtn.disabled = true;
    timerCancelBtn.style.backgroundImage = '';
    timerCancelBtn.className = 'DeactivationCancel';
    
    timerStartBtn.disabled = false;
    timerStartBtn.style.backgroundImage = '';
    timerStartBtn.className = 'ActivationStart waitingClick';
    timerStartBtn.onclick = timerFirstScreen;
}

function timerFirstScreen(){
    for(let i=0; i<resultInfo.length; i++){
        resultInfo[i].innerText = '';
    } //  htmlCollection ??????
    resultArea.style.display = 'none';
    timerOption.style.display = 'block';
    timerStartBtn.onclick = timerStart;
    timer.style.visibility = 'hidden';
}

function popUpTimer(){
    if (window.innerWidth < 1128) {
        deleteTaxiWindow();
        deleteQuestWindow();
    }
    

    if(timer.style.visibility == 'visible'){
        timer.style.visibility = 'hidden';
    } else{
        timer.style.visibility = 'visible';
        tooltipText.classList.add('hidden')
    }
}
tictacArea.style.display = 'none';
resultArea.style.display = 'none';

function timerResult(){
    result_startTime.innerText = `??????: ${memoryStart}` 
    result_stopTime.innerText = `??????: ${memoryStop}`
    result_totalCount.innerText = `${memoryTotalTime}`
    result_expCoupon.innerHTML += `x${memoryExpcoupon}`
    result_item.innerHTML += `x${memoryItem}`
}


timerNpc.addEventListener('click', popUpTimer);
timerStartBtn.addEventListener('mouseover', () => timerStartBtn.style.backgroundImage = "url('" + BtOkMouseOver.src + "')");
timerStartBtn.addEventListener('mouseleave', () => timerStartBtn.style.backgroundImage = "url('" + BtOkNormal.src + "')" );
timerStartBtn.addEventListener('mousedown', () => timerStartBtn.style.backgroundImage = "url('" + BtOkPressed.src + "')" );
timerStartBtn.addEventListener('mouseup', () => timerStartBtn.style.backgroundImage = "url('" + BtOkNormal.src + "')" );

timerCancelBtn.addEventListener('mouseover', () => timerCancelBtn.style.backgroundImage = "url('" + BtCancelMouseOver.src + "')");
timerCancelBtn.addEventListener('mouseleave', () => timerCancelBtn.style.backgroundImage = "url('" + BtCancelNormal.src + "')");
timerCancelBtn.addEventListener('mousedown', () => timerCancelBtn.style.backgroundImage = "url('" + BtCancelPressed.src + "')");
timerCancelBtn.addEventListener('mouseup', () => timerCancelBtn.style.backgroundImage = "url('" + BtCancelNormal.src + "')");


const button = document.querySelector('.tooltip-button'); //?????????????????? ?????????????????? ???????????
const tooltipText = document.querySelector('.tooltip-text');

button.addEventListener('click', () => {
  tooltipText.classList.toggle('hidden');
});

