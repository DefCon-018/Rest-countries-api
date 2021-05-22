
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
        newCountry.setAttribute('data-country-name', `${country.name}`)
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
    afterLoading();
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
            newCountry.setAttribute('data-country-name', `${country.name}`)
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
        afterLoading();
    }
}

let input = document.getElementById('search-country');
let suggestions = document.getElementById('suggestions')
input.addEventListener('keypress', function(event){
    let option = input.value;
    console.log(option);
    let xhrRequest = new XMLHttpRequest();
    xhrRequest.open('get', `https://restcountries.eu/rest/v2/name/${option}`);
    xhrRequest.onload = function(){
        let xhrResponse = JSON.parse(xhrRequest.response);
        suggestions.innerHTML = "";
        for(let country of xhrResponse){
            let element = document.createElement('div');
            element.innerHTML = `${country.name}`;
            element.setAttribute('class', 'suggestion-country');
            suggestions.append(element);
        }
    }
    xhrRequest.send();
    xhrRequest.onerror = function(xhrObject, status){
        if(status == 404){
            return;
        }
    }
    if(event.keyCode === 13){
        let countryName = input.value;
    }
})

input.addEventListener('keydown', function(event){
    console.log(event.keyCode);
    if(event.keyCode === 13){
        
    }
})

// let getOneCountry = function(){

// }

function afterLoading(){
   let allCountries = document.querySelectorAll('.country');
    for(let i = 0; i < allCountries.length; i++){
        allCountries[i].addEventListener('click', function(){
            showCountry(allCountries[i]);
        });
    }
}

function showCountry(country){
    let option = country.getAttribute('data-country-name');
    let xhrRequest = new XMLHttpRequest();
    xhrRequest.open('get', `https://restcountries.eu/rest/v2/name/${option}?fullText=true`);
    xhrRequest.send();
    xhrRequest.onload = function(){
        // let seperateCountry = document.getElementById('seperate-country');
        // console.log(seperateCountry);
        // seperateCountry.classList.add('active');
        // let main = document.getElementById('main');
        // main.classList.add('hide');
        let body = document.querySelector('body');
        body.classList.toggle('open');

        let xhrResponse = JSON.parse(xhrRequest.response);
        let name = document.querySelector('#sc-name');
        let flag = document.querySelector('#country-flag-name img');
        let domain = document.querySelector('#top-level-domain');
        let nativeName = document.querySelector('#native-name');
        let population = document.querySelector('#population');
        let currency = document.querySelector('#currency');
        let region =  document.querySelector('#region');
        let language = document.querySelector('#language');
        let subRegion =  document.querySelector('#sub-region');
        let capital =  document.querySelector('#capital');
        flag.setAttribute('src', `${xhrResponse[0].flag}`);
        domain.innerHTML = `<span class= "desc-span">Top Level Domain</span> : ${xhrResponse[0].topLevelDomain}`;  
        nativeName.innerHTML = `<span class= "desc-span">Native Name</span> : ${xhrResponse[0].nativeName}`;
        population.innerHTML = `<span class= "desc-span">Population </span>: ${xhrResponse[0].population}`;
        currency.innerHTML = `<span class= "desc-span">Currency </span> : ${xhrResponse[0].currencies[0].name}`;
        region.innerHTML = `<span class= "desc-span">Region</span> : ${xhrResponse[0].region}`;
        language.innerHTML = `<span class= "desc-span">Language</span> : ${xhrResponse[0].language}`;
        subRegion.innerHTML = `<span class= "desc-span">Sub Region</span> : ${xhrResponse[0].subregion}`;
        capital.innerHTML = `<span class= "desc-span">Capital</span> : ${xhrResponse[0].capital}`;
        name.textContent = `${xhrResponse[0].name}`;
        let borderCountries = xhrResponse[0].borders;
        let borderCountry = document.getElementById('border-countries');
        for(let bcountry of borderCountries){
            let innerhtml = `${bcountry}`;
            let span = document.createElement('span');
            span.innerHTML = innerhtml;
            borderCountry.append(span);
        }
    }
}

let back = document.getElementById('back');
back.addEventListener('click', function(){
    let body = document.querySelector('body');
    body.classList.toggle('open');  
})

let darkMode = document.querySelectorAll('#themes h2');
for(let mode of darkMode){
    mode.addEventListener('click', function(event){
        let body = document.querySelector('body');
        body.classList.toggle('dark');
    })
}