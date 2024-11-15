(() => {
  const $ = document.querySelector.bind(document);
  let heSoTyLe = {
    dauSi: 5,
    phapSu: 2,
    troThu: 1,
    doDon: 1,
    satThu: 5,
    xaThu: 2,
  };
  let mau = 0;
  let timeRotate = 1000; //7 giây
  let currentRotate = 0;
  let isRotating = false;
  const wheel = $(".wheel");
  const btnWheel = $(".btn--wheel");
  const showMsg = $(".msg");
  const tuong = document.querySelectorAll(".tuong");
  //=====< Danh sách phần thưởng >=====
  const stringDauSi =
    "Lữ Bố, Triệu Vân, Zephys, Ormarr, Maloch, Arthur, Skud, Zuka, Arduin, Ryoma, Astrid, Superman, Wonder Woman, Kil'Groth, Omen, Max, Rourke, Roxie, Amily, Richter, Florentino, Veres, Errol, Yena, Qi, Volkath, Ata, Allain, Dextra, Tachi, Yan, Bijian, bidon";
  const stringPhapSu =
    "Veera, Krixi, Mganga, Kahlii, Điêu Thuyền, Azzen'Ka, Aleister, Natalya, Jinna, Ilumia, Preyta, Raz, Lauriel, Ignis, Zill, Tulen, Liliana, The Flash, Marja, D'arcy, Ishar, Dirak, Zata, Lorion, IGGY, Yue, Bonnie";
  const stringTroThu =
    "Chaugnar, Alice, do le anh, Helen, Xeniel, TeeMee, Annette, Sephera, Zip, Krizzix, Rouie, Aya, Ming";
  const stringDoDon =
    "Thane, Mina, Omega, Gildur, Toro, Taara, Grakk, Lumburr, Cresht, Arum, Baldum, Y'bneth, Wiro";
  const stringSatThu =
    "Butterfly, Nakroth, Ngộ Không, Kriknak, Batman, Airi, Murad, Quillen, Enzo, Keera, Paine, Sinestrea, AOI";
  const stringXathu =
    "Valhein, Violet, Yorn, Fennik, Slimz, Joker, Tel'Annas, Moren, Lindis, Wisp, Elsu, Hayate, Capheny, Celica, Eland'orr, Laville, Thorne, Bright, Terri, Erin";
  const listTuong = {
    dauSi: stringDauSi.split(", "),
    phapSu: stringPhapSu.split(", "),
    troThu: stringTroThu.split(", "),
    doDon: stringDoDon.split(", "),
    satThu: stringSatThu.split(", "),
    xaThu: stringXathu.split(", "),
  };

  tuong.forEach((item) => {
    item.addEventListener("click", () => {
      item.classList.toggle("pick");
      let nameArray = item.getAttribute("typeTuong");
      let listPicked = listTuong[nameArray];

      if (item.getAttribute("class") == "tuong pick") {
        //lấy array có tướng
        listPicked.forEach((item) => {
          let tmp = {};
          tmp.type = nameArray;
          tmp.text = `${item}`;
          listGiftTest.push(tmp);
        });

        mau += listPicked.length * heSoTyLe[nameArray];
        // listGiftTest.forEach((item) => {
        //   item.percent = 1 / listGiftTest.length;
        // });
        loadPage();
        //ham load lai page
      } else {
        listGiftTest = listGiftTest.filter(
          (item2) => !listPicked.includes(item2.text)
        );

        mau -= listPicked.length * heSoTyLe[nameArray];
        loadPage();
      }
    });
  });

  var listGiftTest = [];
  var size = listGiftTest.length;

  //=====< Số đo góc của 1 phần thưởng chiếm trên hình tròn >=====
  var rotate = 360 / size;

  //=====< Số đo góc cần để tạo độ nghiêng, 90 độ trừ đi góc của 1 phần thưởng chiếm >=====
  var skewY = 90 - rotate;

  loadPage();
  function loadPage() {
    size = listGiftTest.length;
    rotate = 360 / size;
    skewY = 90 - rotate;

    //=====< Số lượng phần thưởng >=====

    if (listGiftTest.length > 0)
      listGiftTest.map((item, index) => {
        //=====< Tạo thẻ li >=====
        const elm = document.createElement("li");

        //=====< Xoay và tạo độ nghiêng cho các thẻ li >=====
        elm.style.transform = `rotate(${
          rotate * index
        }deg) skewY(-${skewY}deg)`;

        //=====< Thêm background-color so le nhau và căn giữa cho các thẻ text>=====

        elm.innerHTML = `<div style="transform: skewY(${skewY}deg) rotate(${
          rotate / 2
        }deg);" class="text text-${index % 3}">
                <span class="name-hero">${item.text}</span>
            </div>`;

        //=====< Thêm vào thẻ ul >=====
        wheel.appendChild(elm);
      });
    else {
      if (listGiftTest.length === 0) {
        // Kiểm tra nếu listGiftTest rỗng, thì xóa tất cả các phần tử con trong wheel
        while (wheel.firstChild) {
          wheel.removeChild(wheel.firstChild);
        }
      }
    }
    listGiftTest.forEach((item) => {
      item.percent = heSoTyLe[item.type] / mau;
    });
    // console.log(listGiftTest);
    /********** Hàm bắt đầu **********/
  }
  const start = () => {
    showMsg.innerHTML = "";
    isRotating = true;
    //=====< Lấy 1 số ngầu nhiên 0 -> 1 >=====
    const random = Math.random();

    //=====< Gọi hàm lấy phần thưởng >=====
    const gift = getGift(random);

    //=====< Số vòng quay: 360 độ = 1 vòng (Góc quay hiện tại) >=====
    currentRotate += 360 * 10;

    //=====< Gọi hàm quay >=====
    rotateWheel(currentRotate, gift.index);

    //=====< Gọi hàm in ra màn hình >=====
    showGift(gift);
  };

  /********** Hàm quay vòng quay **********/
  const rotateWheel = (currentRotate, index) => {
    $(".wheel").style.transform = `rotate(${
      //=====< Góc quay hiện tại trừ góc của phần thưởng>=====
      //=====< Trừ tiếp cho một nửa góc của 1 phần thưởng để đưa mũi tên về chính giữa >=====
      currentRotate - index * rotate - rotate / 2
    }deg)`;
  };

  /********** Hàm lấy phần thưởng **********/
  const getGift = (randomNumber) => {
    let currentPercent = 0;
    let list = [];
    listGiftTest.forEach((item, index) => {
      //=====< Cộng lần lượt phần trăm trúng của các phần thưởng >=====
      currentPercent += item.percent;
      //=====< Số ngẫu nhiên nhỏ hơn hoặc bằng phần trăm hiện tại thì thêm phần thưởng vào danh sách >=====
      if (randomNumber <= currentPercent) {
        list.push({ ...item, index });
      }
    });

    //=====< Phần thưởng đầu tiên trong danh sách là phần thưởng quay được>=====

    return list[0];
  };

  /********** In phần thưởng ra màn hình **********/
  const showGift = (gift) => {
    let timer = setTimeout(() => {
      isRotating = false;

      showMsg.innerHTML = `${gift.text}`;

      clearTimeout(timer);
    }, timeRotate);
  };

  /********** Sự kiện click button start **********/
  btnWheel.addEventListener("click", () => {
    if (listGiftTest.length > 0) !isRotating && start();
  });
})();
