const listaTweets = document.getElementById('lista-tweets');

eventListeners();

function eventListeners(){
	document.querySelector('#formulario').addEventListener('submit', addTweet);
	listaTweets.addEventListener('click', deleteTweet);
	document.addEventListener('DOMContentLoaded', getListFromLocalStorage);
}

function addTweet(e) {
	e.preventDefault();
	//console.log('formulario enviado');

	/* Leer valor de textarea */

	const tweet = document.getElementById('tweet').value;
	//console.log('new tweet:', tweet);

	const btnDelete = document.createElement('a');
	btnDelete.classList = 'borrar-tweet';
	btnDelete.innerText = 'X';

	const li = document.createElement('li');
	li.innerHTML = tweet;

	// Añade el boton borrar al tweet
	li.appendChild(btnDelete);

	// Añade el tweet a la lista
	listaTweets.appendChild(li);

	addTweetToLocalStorage(tweet);
}

function deleteTweet(e){
	e.preventDefault();
	//console.log('Tweet borrado');

	if(e.target.className === 'borrar-tweet'){
		//console.log('Eliminado', e.target.parentElement);
		e.target.parentElement.remove();

		
		deleteTweetFromLocalStorage(e.target.parentElement);

		
		alert('Tweet eliminado');
	}
}

function addTweetToLocalStorage(tweet) {
	let tweets;
	tweets = getTweetsLocalStorage();

	tweets.push(tweet);

	localStorage.setItem('tweets', JSON.stringify(tweets));
}

function getTweetsLocalStorage(){
	let tweets;
	if(localStorage.getItem('tweets') === null){
		tweets = [];
	}else{
		tweets = JSON.parse(localStorage.getItem('tweets'));
	}

	return tweets;
}

// Mostrar datos del localstorage
function getListFromLocalStorage(){
	let tweets;

	tweets = getTweetsLocalStorage();

	tweets.forEach( function(tweet) {
		const btnDelete = document.createElement('a');
		btnDelete.classList = 'borrar-tweet';
		btnDelete.innerText = 'X';

		const li = document.createElement('li');
		li.innerHTML = tweet;

		// Añade el boton borrar al tweet
		li.appendChild(btnDelete);

		// Añade el tweet a la lista
		listaTweets.appendChild(li);
	});
}

function deleteTweetFromLocalStorage(tweet){
	let tweets, tweetDelete;

	tweetDelete = tweet.innerText.replace('X', '');

	tweets = getTweetsLocalStorage();

	tweets.forEach( function(element, index) {
		if(tweetDelete === element){
			tweets.splice(index, 1);
			//console.log('tweet eliminado de localStorage -> ', tweet);
		}
		
	});
	
	localStorage.setItem('tweets', JSON.stringify(tweets));
	//console.log('tweets', tweets);
}
