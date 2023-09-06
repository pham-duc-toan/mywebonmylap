const clock = document.querySelector(".clock .content");
const huongdan =document.querySelector(".huongdan");
const support =document.querySelector(".support");
const buttonX = document.querySelector(".button-dong");
const csmm = document.querySelector(".csmm .content");
const warning =document.querySelector(".warning");
const nutcuoc=document.querySelector(".button");
var money=document.querySelector("#coin");
var giay=0;
var coin =100;

buttonX.addEventListener("click",()=>{
    support.classList.remove("hienhuongdan")
})
huongdan.addEventListener("click",()=>{
    support.classList.add("hienhuongdan")
})

function loadPage (){
    var de = Math.floor(Math.random()*100 );
    giay =0;
    csmm.innerHTML=de;

    if(coin<=0){
        warning.classList.add("warning-on");
    }
    money.innerHTML= coin;
}
setInterval( ()=>{
    
    
    // console.log(Math.floor(Math.random()*100 ));
    if(giay==60){
        loadPage();
    }
    clock.innerHTML=giay;
    giay+=1;
},1000);