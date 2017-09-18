/*jshint esversion: 6 */
(function() {
	"use strict";
	let imgchanger;
	doFetch();

	function doFetch() {
		fetch('http://csw08724.appspot.com/breeds.ajax', {method: 'GET'
	}).then(function(response){

			if (!response.ok) {
				throw new Error(response.statusText);
			}

			return response.json();
	}).then (function(jsonData) {
		let selectCon = document.querySelector("select");
		jsonData.forEach(function(data) {
	 		let option = document.createElement('option');
	 		option.value = data.id;
	 		option.textContent = data.name;
	 		selectCon.appendChild(option);
		});
		fetchDetail();
	}).catch(function(error) {
		alert(error);
	});
	// document.querySelector("select").addEventListener("change", callback: EventListener, capture?: boolean)
	}

	function fetchDetail() {
		fetch('http://csw08724.appspot.com/breed.ajax?id=1', {method: 'GET'
		}).then(function(response){
			if(!response.ok) {
				throw new Error(response.statusText);
			}

			return response.json();
		}).then (function(firstBreed){
			let breedName = document.querySelector('#breedName');
			breedName.textContent = firstBreed.name;
			let des = document.querySelector('#description .text');
			des.textContent = firstBreed.description;
			let ori = document.querySelector('#origins .text');
			ori.textContent = firstBreed.origins;
			let rightForYou = document.querySelector('#rightForYou .text');
			rightForYou.textContent = firstBreed.rightForYou;
			let image = document.querySelector("img");
			let imageUrls = firstBreed.imageUrls;
			let i = 0;

			function setBackgroundPic() {
				i = i % imageUrls.length; 
				let url = 'http://csw08724.appspot.com/' + imageUrls[i];
				image.src = url;
				i = i + 1;
			}

			imgchanger = setTimeout(
				(function changBgImg() {
				setBackgroundPic();
				imgchanger = setTimeout(changBgImg, 5000);
			}), 0);
		});
	}

	document.querySelector('#breedSelector').addEventListener('change', displayInfoAjax, false);

	function displayInfoAjax() {
		let xhr = new XMLHttpRequest();
		let urlAppendId = document.querySelector('#breedSelector').value;
		let url = 'http://csw08724.appspot.com/breed.ajax' + '?id=' + urlAppendId;
		let i = 0;

		xhr.onreadystatechange = function() {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				if ((200 <= xhr.status && xhr.status < 300) || xhr.status === 304) {
					let breedInfo = JSON.parse(xhr.responseText);
					let breedName = document.querySelector('#breedName');
					breedName.textContent = breedInfo.name;
					let des = document.querySelector('#description .text');
					des.textContent = breedInfo.description;
					let ori = document.querySelector('#origins .text');
					ori.textContent = breedInfo.origins;
					let rightForYou = document.querySelector('#rightForYou .text');
					rightForYou.textContent = breedInfo.rightForYou;
					let image = document.querySelector("img");
					let imageUrls = breedInfo.imageUrls;

					clearTimeout(imgchanger);

					imgchanger = setTimeout(
						(function changBgImg() {
						setBackgroundPic(image, imageUrls);
						imgchanger = setTimeout(changBgImg, 5000);
					}), 0);
				}
			}
			function setBackgroundPic(image, imageUrls) {
				i = i % imageUrls.length; 
				let url = 'http://csw08724.appspot.com/' + imageUrls[i];
				image.src = url;
				i = i + 1;
			}	
		};

		
		xhr.open('GET', url, true);

		xhr.send(null);
	}
})();

