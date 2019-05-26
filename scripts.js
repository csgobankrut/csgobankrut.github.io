var img = new Image();
var wartosc;
var zablokowane = false;

function aktualizacja() {
	if (localStorage.pieniadze == null) {
		localStorage.pieniadze = 100;
	}
	document.getElementById("kasa").innerHTML = "Pieniądze: " + localStorage.pieniadze/100 + "zł";
}

function skrzynka() {
	var skrzynka;
	switch(location.hash) {
		default:
			img.src = 'skrzynki/rdza.png';
			skrzynka = 'Zardzewiała skrzynka';
			wartosc = 3;
			break;
		case '#szara':
			img.src = 'skrzynki/szara.png';
			skrzynka = 'Szara skrzynka';
			wartosc = 10;
			break;
		case '#zolta':
			img.src = 'skrzynki/zolta.png';
			skrzynka = 'Żółta skrzynka';
			wartosc = 20;
			break;
		case '#zielona':
			img.src = 'skrzynki/zielona.png';
			skrzynka = 'Zielona skrzynka';
			wartosc = 60;
			break;
		case '#niebieska':
			img.src = 'skrzynki/niebieska.png';
			skrzynka = 'Niebieska skrzynka';
			wartosc = 90;
			break;
		case '#czerwona':
			img.src = 'skrzynki/czerwona.png';
			skrzynka = 'Czerwona skrzynka';
			wartosc = 100;
			break;
		case '#srebrna':
			img.src = 'skrzynki/srebrna.png';
			skrzynka = 'Srebrna skrzynka';
			wartosc = 200;
			break;
		case '#zlota':
			img.src = 'skrzynki/zlota.png';
			skrzynka = 'Złota skrzynka';
			wartosc = 500;
	}
	img.onload = function() {
		var x = Math.random()*154;
		var c = document.getElementById("pole");
		var ctx = c.getContext("2d");
		var w = window.innerWidth;
		c.width = w - 15;
		ctx.fillStyle = "#505050";
		ctx.fillRect(0, 0, c.width, c.height);
		ctx.strokeStyle = "#42a32a";
		ctx.lineWidth = 4;		
		for (i = -154; i < w; i = i + 154) {
			ctx.strokeRect(i+x+1, 1, 153, 153);
			ctx.drawImage(img,i+x+2,2);
		}
		ctx.fillStyle = "#ff8800";
		ctx.fillRect(c.width/2, 0, 5, c.height);
	};
	document.getElementById('skrzynka').innerHTML = skrzynka;
	if(parseInt(localStorage.pieniadze) < wartosc) {
		document.getElementById('otworz').innerHTML = 'Nie stać cie!';
	} else {
		document.getElementById('otworz').innerHTML = 'Otwórz za ' + wartosc/100 + 'zł';
	}
}

function kod() {
	var kod = document.getElementById("kod").value;
	var pieniadze = parseInt(localStorage.pieniadze);
	switch(kod) {
		case "error":
			document.body.style.margin = "0";
			document.body.innerHTML = '<img src="https://upload.wikimedia.org/wikipedia/commons/3/3b/Windows_9X_BSOD.png" width="100%" height="100%"/>';
			break;
		case "goha":
			alert("Goha Goha Goha Goha Goha Goha Goha Goha Goha Goha Goha Goha Goha Goha Goha Goha Goha Goha 2zł");
			dodaj(100);
			break;
		case "elektryka prąd nie tyka":
			alert("Przysłowie polskie. Jeśli ktoś jest dobry w danej dziedzinie, to potrafi zapanować nad niebezpieczeństwami z nią związanymi.");
			dodaj(150);
			break;
		default:
			alert("Nieprawidłowy kod! Nie ma takiego kodu :/");
	}
	document.getElementById("kod").value = "";
}

function pejsaf() {
	var pejsaf = document.getElementById("pejsaf").value;
	if (pejsaf.length == 16) {
		alert('Niestety z powodu awarii nie można wypłacić pieniędzy z pejsafa. Jeśli "przypadkiem" znikną ci pieniądze z tego pejsafa to na pewno nie nasza wina :D');
	} else {
		alert("Wprowadź prawdziwy kod z pejsafa albo wpierdol.");
	}
	document.getElementById('pejsaf').value = "";
}

function sprzedaj(przedmiot, cena) {
	var pytanie = confirm("Czy na pewno chcesz sprzedać " + nazwy_przedmiotow[przedmiot] + " za " + cena/100 + "zł?");
	if (pytanie == true) {
		localStorage.pieniadze = parseInt(localStorage.pieniadze) - cena;
		aktualizacja();
	}
}

function dodaj(kasa) {
	localStorage.pieniadze = parseInt(localStorage.pieniadze) + kasa;
	aktualizacja();
}

function animacja(acc) {
	var x = Math.random()*154;
	if (!zablokowane) {
		zablokowane = true;
		dodaj(-wartosc);
		document.getElementById('otworz').innerHTML = 'Czekaj...';
		document.getElementById('gratulacje').innerHTML = '';
		var c = document.getElementById("pole");
		var ctx = c.getContext("2d");
		var w = window.innerWidth;
		c.width = w - 15;
		ctx.strokeStyle = "#42a32a";
		ctx.lineWidth = 4;
		var inter = window.setInterval(function () {
			acc = acc * 0.99;
			if (acc < 0.01) {
				clearInterval(inter);
				if(parseInt(localStorage.pieniadze) < wartosc) {
					document.getElementById('otworz').innerHTML = 'Nie stać cie!';
				} else {
					document.getElementById('otworz').innerHTML = 'Otwórz za ' + wartosc/100 + 'zł';
					zablokowane = false;
				}
			}
			if (x < 0) x += 154;
			x -= acc;
			ctx.fillStyle = "#505050";
			ctx.fillRect(0, 0, c.width, c.height);
			for (i = -154; i < w; i = i + 154) {
				ctx.strokeRect(i+x+1, 1, 153, 153);
				ctx.drawImage(img,i+x+2,2);
			}
			ctx.fillStyle = "#ff8800";
			ctx.fillRect(c.width/2, 0, 5, c.height);
		}, 0);
	}
}
