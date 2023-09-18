(() => {
	const $ = document.querySelector.bind(document);

	let timeRotate = 1000; //7 giây
	let currentRotate = 0;
	let isRotating = false;
	const wheel = $('.wheel');
	const btnWheel = $('.btn--wheel');
	const showMsg = $('.msg');
    const tuong = document.querySelectorAll(".tuong");
	//=====< Danh sách phần thưởng >=====
    const stringDauSi = "Lữ Bố, Triệu Vân, Zephys, Ormarr, Maloch, Arthur, Skud, Zuka, Arduin, Ryoma, Astrid, Superman, Wonder Woman, Kil'Groth, Omen, Max, Rourke, Roxie, Amily, Richter, Florentino, Veres, Errol, Yena, Qi, Volkath, Ata, Allain, Dextra, Tachi, Yan, Bijian";
    const stringPhapSu ="Veera, Krixi, Mganga, Kahlii, Điêu Thuyền, Azzen'Ka, Aleister, Natalya, Jinna, Ilumia, Preyta, Raz, Lauriel, Ignis, Zill, Tulen, Liliana, The Flash, Marja, D'arcy, Ishar, Dirak, Zata, Lorion, IGGY, Yue, Bonnie";
    const stringTroThu = "Chaugnar, Alice, Helen, Xeniel, TeeMee, Annette, Sephera, Zip, Krizzix, Rouie, Aya";
    const stringDoDon ="Thane, Mina, Omega, Gildur, Toro, Taara, Grakk, Lumburr, Cresht, Arum, Baldum, Y'bneth, Wiro";
    const stringSatThu = "Butterfly, Nakroth, Ngộ Không, Kriknak, Batman, Airi, Murad, Quillen, Enzo, Keera, Paine, Sinestrea, AOI";
    const stringXathu = "Valhein, Violet, Yorn, Fennik, Slimz, Joker, Tel'Annas, Moren, Lindis, Wisp, Elsu, Hayate, Capheny, Celica, Eland'orr, Laville, Thorne, Bright, Terri";
    const listTuong = {
        dauSi :stringDauSi.split(", "),
        phapSu : stringPhapSu.split(", "),
        troThu : stringTroThu.split(", "),
        doDon : stringDoDon.split(", "),
        satThu: stringSatThu.split(", "),
        xaThu:stringXathu.split(", ")
    };

    tuong.forEach(item=>{item.addEventListener("click",()=>{
        item.classList.toggle("pick");
        let nameArray = item.getAttribute("typeTuong");
        let listPicked = listTuong[nameArray];
        // console.log(`${item.getAttribute("typeTuong")}`);
        if(item.getAttribute("class") == "tuong pick"){
            //lấy array có tướng
            console.log("picked");
            listPicked.forEach(item => {
                let tmp = {};
                tmp.text = `${item}`;
                listGiftTest.push(tmp);
                
            })
            listGiftTest.forEach(item => {
                item.percent = 1 / listGiftTest.length;
            })
            console.log(listGiftTest);
            //ham load lai page
        }
        else {    
            listGiftTest = listGiftTest.filter(item2 => !listPicked.includes(item2.text));
            console.log(listGiftTest);
        }
        })
    })

	var listGiftTest = [];
    var listGift = [
		{
			text: '1',
			
		},
		{
			text: '2',
			
		},
		{
			text: '3',
			
		},
		{
			text: '4',
			
		},
		{
			text: '5',
			
		},
		{
			text: '6',
			
		},
		{
			text: '7',
			
		},
		{
			text: '8',
			
		},
	];
    listGift.forEach(item => {
        item.percent = 1 / listGift.length;
    })
    console.log(listGift.length);
	//=====< Số lượng phần thưởng >=====
	const size = listGift.length;

	//=====< Số đo góc của 1 phần thưởng chiếm trên hình tròn >=====
	const rotate = 360 / size;

	//=====< Số đo góc cần để tạo độ nghiêng, 90 độ trừ đi góc của 1 phần thưởng chiếm >=====
	const skewY = 90 - rotate;

	listGift.map((item, index) => {
		//=====< Tạo thẻ li >=====
		const elm = document.createElement('li');

		//=====< Xoay và tạo độ nghiêng cho các thẻ li >=====
		elm.style.transform = `rotate(${
			rotate * index
		}deg) skewY(-${skewY}deg)`;

		//=====< Thêm background-color so le nhau và căn giữa cho các thẻ text>=====
		if (index % 2 == 0) {
			elm.innerHTML = `<p style="transform: skewY(${skewY}deg) rotate(${
				rotate / 2
			}deg);" class="text text-1">
			<b>${item.text}</b>
		</p>`;
		} else {
			elm.innerHTML = `<p style="transform: skewY(${skewY}deg) rotate(${
				rotate / 2
			}deg);" class="text text-2">
		<b>${item.text}</b>
		</p>`;
		}

		//=====< Thêm vào thẻ ul >=====
		wheel.appendChild(elm);
	});

	/********** Hàm bắt đầu **********/
	const start = () => {
		showMsg.innerHTML = '';
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
		$('.wheel').style.transform = `rotate(${
			//=====< Góc quay hiện tại trừ góc của phần thưởng>=====
			//=====< Trừ tiếp cho một nửa góc của 1 phần thưởng để đưa mũi tên về chính giữa >=====
			currentRotate - index * rotate - rotate / 2
		}deg)`;
	};

	/********** Hàm lấy phần thưởng **********/
	const getGift = randomNumber => {
		let currentPercent = 0;
		let list = [];

		listGift.forEach((item, index) => {
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
	const showGift = gift => {
		let timer = setTimeout(() => {
			isRotating = false;

			showMsg.innerHTML = `${gift.text}`;

			clearTimeout(timer);
		}, timeRotate);
	};

	/********** Sự kiện click button start **********/
	btnWheel.addEventListener('click', () => {
		!isRotating && start();
	});
})();