
    let pageNumber = 0,
    	prevUrl, nextUrl;
window.onload = function(){
    getData('https://swapi.co/api/people/');
}

const getData = (url) => {
	fetch(url)
	  .then((response) => {
	    return response.json();
	  })
	  .then((data) => {
	  	prevUrl = data.previous;
	  	nextUrl = data.next;

		checkNextPrevPage(prevUrl, nextUrl);
	  	drawData(data.results);
	  })
	  .catch((error) => {
	    console.error('There has been a problem with your fetch operation:', error);
	  });
}

let drawData = (datas) => {
    let peopleList = document.getElementById("peopleList");
    removeElement();

	let list = datas.map(function(data, index) {
		let tr = "<tr>",
			number = index;
			if (pageNumber == 0) {
				number = number + 1;
			}
			else {
				number = (pageNumber * 10) + number + 1;
			}
		tr += "<td>" + number + "</td><td>" + data.name + "</td><td>" + data.birth_year + "</td></tr>";
		peopleList.innerHTML += tr;
	})
}

const nextPage = () => {
	pageNumber = pageNumber + 1;
	getData(nextUrl);
}

const prevPage = () => {
	pageNumber = pageNumber -1;
	getData(prevUrl);
}

const checkNextPrevPage = (prev, next) => {
	let prevButton = document.getElementById("prevButton"),
		nextButton = document.getElementById("nextButton");
	if(prev == null) {
		prevButton.disabled = true;
	}
	else if (next == null) {
		nextButton.disabled = true;
	}
	else {
		prevButton.disabled = false;
		nextButton.disabled = false;
	}
}

const removeElement = () => {
	let element = document.getElementById("peopleList"); 
        
    let child = element.lastElementChild;  
    while (child) { 
        element.removeChild(child); 
        child = element.lastElementChild; 
    } 
}