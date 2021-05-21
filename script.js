
let countries = document.getElementById('countries');
let xhrRequest = new XMLHttpRequest();
let option = document.getElementById('country-options').value;
console.log(option);
xhrRequest.open('get', `https://restcountries.eu/rest/v2/${option}`);
xhrRequest.send();
xhrRequest.onload = function(){
    let responseJson = JSON.parse(xhrRequest.response);
    for(let country of responseJson){
        let newCountry = document.createElement('div');
        let flagImage = document.createElement('div');
        let image = document.createElement('img');
        let description = document.createElement('div');

        newCountry.setAttribute('class', 'country');
        flagImage.setAttribute('class', 'flag-image');
        newCountry.append(flagImage);
        flagImage.append(image);
        description.setAttribute('class', 'description');

        image.setAttribute('src', `${country.flag}`);
        let text = `
          <h3 class= "country-name">${country.name}</h3>
          <p>Population : <span>${country.population}</span></p>
          <p>Region : <span>${country.region}</span></p>
          <p>Capital : <span>${country.capital}</span></p>
        `
        description.innerHTML= text;
        newCountry.append(description);

        countries.append(newCountry);
    }
}

function showCountries(){
    countries.innerHTML = "";
    let xhrRequest = new XMLHttpRequest();
    let option = document.getElementById('country-options').value;
    console.log(option);
    if(option === 'all'){
        xhrRequest.open('get', `https://restcountries.eu/rest/v2/${option}`);
    }
    else{
        xhrRequest.open('get', `https://restcountries.eu/rest/v2/region/${option}`);
    }
    xhrRequest.send();
    xhrRequest.onload = function(){
        let responseJson = JSON.parse(xhrRequest.response);
        for(let country of responseJson){
            let newCountry = document.createElement('div');
            let flagImage = document.createElement('div');
            let image = document.createElement('img');
            let description = document.createElement('div');

            newCountry.setAttribute('class', 'country');
            flagImage.setAttribute('class', 'flag-image');
            newCountry.append(flagImage);
            flagImage.append(image);
            description.setAttribute('class', 'description');

            image.setAttribute('src', `${country.flag}`);
            let text = `
            <h3 class= "country-name">${country.name}</h3>
            <p>Population : <span>${country.population}</span></p>
            <p>Region : <span>${country.region}</span></p>
            <p>Capital : <span>${country.capital}</span></p>
            `
            description.innerHTML= text;
            newCountry.append(description);

            countries.append(newCountry);
        }
    }
}