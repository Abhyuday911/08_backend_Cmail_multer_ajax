//kam krne wala

const switchCtn = document.querySelector("#switch-cnt");
const switchC1 = document.querySelector("#switch-c1");
const switchC2 = document.querySelector("#switch-c2");
const switchCircle = document.querySelectorAll(".switch__circle");
const switchBtn = document.querySelectorAll(".switch-btn");
const aContainer = document.querySelector("#a-container");
const bContainer = document.querySelector("#b-container");
const allButtons = document.querySelectorAll(".submit");

let changeForm = (e) => {
	switchCtn.classList.add("is-gx");
	setTimeout(function () {
		switchCtn.classList.remove("is-gx");
	}, 1500);

	switchCtn.classList.toggle("is-txr");
	switchCircle[0].classList.toggle("is-txr");
	switchCircle[1].classList.toggle("is-txr");

	switchC1.classList.toggle("is-hidden");
	switchC2.classList.toggle("is-hidden");
	aContainer.classList.toggle("is-txl");
	bContainer.classList.toggle("is-txl");
	bContainer.classList.toggle("is-z200");
};

let mainF = (e) => {
	// for (var i = 0; i < allButtons.length; i++)
	// 	allButtons[i].addEventListener("click", getButtons);
	for (var i = 0; i < switchBtn.length; i++)
		switchBtn[i].addEventListener("click", changeForm);
};

window.addEventListener("load", mainF);

// #ecf0f3 -> rgb(33,33,33)

// #d1d9e6 -> rgb(22,22,22)

// #f9f9f9 -> #272727

//switch

check = false;

document.querySelector(".s__label").addEventListener("click", function () {
	check = check ? true : false;

	document.querySelector('#parentofall').style.display= 'none'
	document.querySelector('.s').classList.toggle('s-border');

	if (!check) {
		document.querySelector('#stylesheet').href = '/stylesheets/login_dark.css';
		console.log(check)
		check = true;
	}
	else {
		document.querySelector('#stylesheet').href = '/stylesheets/login_light.css';
		console.log(check)

		check = false;
	}
	setTimeout(() => {
		document.querySelector('#parentofall').style.display= 'inherit'
		
	}, 200);
})



def_theame = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (window.matchMedia && def_theame) {
	document.querySelector('#parentofall').style.display = 'none'
	document.querySelector('.s').classList.toggle('s-border');
	document.querySelector('#s__checkbox').click();
	
	document.querySelector('#stylesheet').href = '/stylesheets/login_dark.css';
	
	setTimeout(() => {
		document.querySelector('#parentofall').style.display = 'inherit'
	}, 200);

	check = true;
}