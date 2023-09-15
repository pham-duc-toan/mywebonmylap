const clock = document.querySelector(".clock .content");
const huongdan =document.querySelector(".huongdan");
const support =document.querySelector(".support");
const buttonX = document.querySelector(".button-dong");
const csmm = document.querySelector(".csmm .content");
const warning =document.querySelector(".warning");
const chan=document.querySelector(".button.chan");
const le=document.querySelector(".button.le");
const tai=document.querySelector(".button.tai");
const xiu=document.querySelector(".button.xiu");
var money=document.querySelector("#coin");
var tienCuoc = document.querySelector("#tienCuoc");
var his = document.querySelector(".history tbody");
var giay=0;
var coin =100;
var tchan =0;
var txiu =0;
var ttai =0;
var tle =0;
buttonX.addEventListener("click",()=>{
    support.classList.remove("hienhuongdan")
})
huongdan.addEventListener("click",()=>{
    support.classList.add("hienhuongdan")
})
chan.addEventListener("click",()=>{
    // console.log(tienCuoc.attributes);
    if(tienCuoc.value>=0 && coin>=tienCuoc.value){
        tchan += tienCuoc.value;
        coin-=tchan;
        money.innerHTML = coin;
        his.innerHTML = his.innerHTML + `
        <tr>
            <td>${tienCuoc.value}</td>
            <td>Chẵn</td>
        </tr>
        `
    }
    else {
        alert("Đặt hẳn hoi dmmm");
    }
    tienCuoc.value="";
})
le.addEventListener("click",()=>{
    if(tienCuoc.value>=0 && coin>=tienCuoc.value){
        tle += tienCuoc.value;
        coin-=tle;
        money.innerHTML = coin;
        his.innerHTML = his.innerHTML + `
        <tr>
            <td>${tienCuoc.value}</td>
            <td>Lẻ</td>
        </tr>
        `
    }
    else {
        alert("Đặt hẳn hoi dmmm");
    }
    tienCuoc.value="";
})
tai.addEventListener("click",()=>{
    if(tienCuoc.value>=0 && coin>=tienCuoc.value){
        ttai += tienCuoc.value;
        coin-=ttai;
        money.innerHTML = coin;
        his.innerHTML = his.innerHTML + `
        <tr>
            <td>${tienCuoc.value}</td>
            <td>Tài</td>
        </tr>
        `
    }
    else {
        alert("Đặt hẳn hoi dmmm");
    }
    tienCuoc.value="";
})
xiu.addEventListener("click",()=>{
    if(tienCuoc.value>=0 && coin>=tienCuoc.value){
        txiu += tienCuoc.value;
        coin-=txiu;
        money.innerHTML = coin;
        his.innerHTML = his.innerHTML + `
        <tr>
            <td>${tienCuoc.value}</td>
            <td>Xỉu</td>
        </tr>
        `
    }
    else {
        alert("Đặt hẳn hoi dmmm");
    }
    tienCuoc.value="";
})
function loadPage (){
    var de = Math.floor(Math.random()*100 );
    giay =0;
    csmm.innerHTML=de;
    if(de%2==1){
        coin+=tle*2;
    } else {
        coin+=tchan*2;
    }
    if(de>=50){
        coin+=ttai*2;        
    }
    else {
        coin += txiu*2;
    }
    tchan =0;
    tle=0;
    txiu=0;
    ttai=0;
    his.innerHTML ="";
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