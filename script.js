function addPlayer()
{
	function isInputEmpty(inputField)
	{
		return inputField.value === '';
	}
	function resetInput(inputField)
	{
		inputField.value = '';
	}
	
	const playerHolder = document.querySelector('.player_holder');
	const inputField = document.querySelector('.input_field');
	let playerName = inputField.value;

	inputField.focus();
	
	// https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
	if (isInputEmpty(inputField)) return;
	
	let newP = document.createElement('p');
	newP.textContent = playerName;
	playerHolder.appendChild(newP);
	resetInput(inputField);
}

function choosePlayer()
{
	function isListEmpty(playerArray)
	{
		// https://stackoverflow.com/questions/11743392/check-if-an-array-is-empty-or-exists
		return playerArray.length === 0;
	}
	function choose(choices)
	{
		// https://stackoverflow.com/questions/9071573/is-there-a-simple-way-to-make-a-random-selection-from-an-array-in-javascript-or
		let index = Math.floor(Math.random() * choices.length);
		return choices[index];
	}
	const playerArray = document.querySelectorAll('div.player_holder p');
	if (isListEmpty(playerArray)) return;
	showWinner(choose(playerArray).textContent) //alert(choose(playerArray).textContent); // change alert to something else -> showWinner()
	clearPlayerList()
}

function checkEnterPress(e)
{
	function isInputEmpty(inputField)
	{
		return inputField.value === '';
	}
	
	const inputField = document.querySelector('.input_field');
	if (e.key === 'Enter')
	{
		if (isInputEmpty(inputField)) choosePlayer(); else addPlayer();
	}
}

function showWinner(winner)
{
	function removeAlertBox()
	{
		const alertBoxContainer = document.querySelector('.alert_box_container');
		alertBoxContainer.remove();
	}
	
	//Do stuff after, maybe show a div with a shadow and such?
	const body = document.querySelector('body');
	
	let alertBoxContainer = document.createElement('div');
	alertBoxContainer.className = 'alert_box_container';
	let alertBox = document.createElement('div');
	alertBox.className = 'alert_box';
	
	alertBox.textContent = 'And the first player is'
	
	alertBoxContainer.appendChild(alertBox)
	body.appendChild(alertBoxContainer);
	
	t = 500 // Time variable
	for (const element of ['.','.','.',`\r\n${winner}`]){
		window.setTimeout(function(){alertBox.textContent += element;}, t);
		t += 500
		// https://stackoverflow.com/questions/9980416/how-can-i-insert-new-line-carriage-returns-into-an-element-textcontent
	}
	
	window.setTimeout(function(){alertBox.textContent += '\r\nClick anywhere to reset';},t) // I really hate timeout in JS
	alertBoxContainer.addEventListener('click', removeAlertBox);
}

function sleep(ms)
{
  return new Promise(resolve => setTimeout(resolve, ms));
}

function clearPlayerList()
{
	// https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
	const playerHolder = document.querySelector('.player_holder');
	playerHolder.textContent = '';
}

function main()
{
	const inputField = document.querySelector('.input_field');
	const buttonAdd = document.querySelector('.button_add');
	const buttonChoose = document.querySelector('.button_choose');
	
	inputField.focus();
	inputField.addEventListener('keydown', checkEnterPress);
	buttonAdd.addEventListener('click', addPlayer);
	buttonChoose.addEventListener('click', choosePlayer);
}

main()