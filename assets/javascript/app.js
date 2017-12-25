var card = "";
var cardType = "";
$(document).ready(function() {
//accept input
$("#validateCard").on("click", function(event) {
	event.preventDefault();

	card = $("#cardInput").val();
	cardTypeCheck(card);
	numberValidator(card);
	$("form").trigger("reset");
	});


function cardTypeCheck(check){
	var mastercardStringLg = parseInt(check.substr(0,7));
	var mastercardStringSm = parseInt(check.substr(0,2));
	
	if (13 < check.length && check.length < 20){
		if ((check.substr(0,2) === "34" || check.substr(0,2) === "37") && check.length === 15){
			cardType = "Amex";
			$(".cardType").html(cardType);
		} else if ((check.length === 13 || check.length === 16 || check.length === 19) && check.substr(0,1) === "4"){
			cardType = "Visa";
			$(".cardType").html(cardType);
		} else if ((mastercardStringSm >= 51 && mastercardStringSm <= 55) && check.length === 16) {
			cardType = "Mastercard";
			$(".cardType").html(cardType);
		} else if ((mastercardStringLg > 2221000 && mastercardStringLg < 272100) && check.length === 16){
			cardType = "Mastercard";
			$(".cardType").html(cardType);
		} else {
			cardType = "Unknown Card Type";
			$(".cardType").html(cardType);
		}
	} else {
		cardType = "Unknown Card Type";
		$(".cardType").html(cardType);
	}


};

function numberValidator(check){
	var modulo = parseInt(check.substr(check.length-1,check.length));
	var number = check.substr(0,check.length-1).split("").reverse().join("");
	var newNumber = "";

	for (i in number) {
		if ((i % 2) == 0) {
			var temp = parseInt(number[i]) * 2;

			if (temp > 9){
				var subtracted = temp - 9;
				newNumber += subtracted.toString();
			} else {
				newNumber += temp;
			}
			
		} else {
			newNumber += number[i];
		}
	}
	var addItUp = 0;
	for (j in newNumber){
		addItUp += parseInt(newNumber[j]);
	}
	var lastFour = card.substr(card.length-4,card.length);
	var hiddenNumbers = card.substr(0,card.length-4);
	var obfuscatedCard = "";
	for (k in hiddenNumbers) {
		obfuscatedCard += "*";
	}

	obfuscatedCard += lastFour;
	$(".cardNumber").html(obfuscatedCard);

	var moduloCheck = addItUp + modulo;

	if (moduloCheck % 10 == 0) {
		$(".validPrompt").html("Valid");
	} else {
		$(".validPrompt").html("Invalid");
	}
}

//validate input
$("#cardInput").keypress(function (key) {

	if(key.which != 8 && key.which != 0 && (key.which < 48 || key.which > 57)){
		$("#errmsg").html("Digits Only").show().fadeOut("slow");
		return false;
	}
});

//get card type (visa, discover, etc)


//Luhn Algorithm check


//send output

});