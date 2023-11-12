

const obj = {
    method : 'GET',
    headers : {
        'X-Api-Key' : "EBGzuvRR5fEvV2ZSYVvU7w==Kiyo4eOAZh8QIkKC"
    }
    
}
function update()
{
    let city = `delhi`;
    let url = `https://api.api-ninjas.com/v1/weather?city=${city}`;
    fetch(url, obj).then(response => response.json()).then((data) => {
        let sec2 = document.querySelector('.section-2');
        let sec3 = document.querySelector('.section-3');
        let x = 'deg';
        sec2.innerText = 'Delhi';
        sec3.innerText = `${data.temp}\u00B0 C`;

        let sec4 = document.querySelector('.section-4-1-2-1');
        sec4.innerText = `${data.feels_like}\u00B0 C`;

        let sec5 = document.querySelector('.section-4-2-2-1');
        sec5.innerText = `${data.humidity}%`
    })
}


let btn =  document.querySelector('.submit-btn');
btn.addEventListener('click', (e) => {
    e.preventDefault();

    let form = document.querySelector('#form-1');
    let city = form.value;
    console.log('clicked');

    form.value = '';
    if(city.length != 0)
    {
        let url = `https://api.api-ninjas.com/v1/weather?city=${city}`;
        fetch(url, obj).then(response => response.json()).then((data) => {
            let sec2 = document.querySelector('.section-2');
            let sec3 = document.querySelector('.section-3');
            let x = 'deg';
            sec2.innerText = `${city}`;
            sec3.innerText = `${data.temp}\u00B0 C`;
    
            let sec4 = document.querySelector('.section-4-1-2-1');
            sec4.innerText = `${data.feels_like}\u00B0 C`;
    
            let sec5 = document.querySelector('.section-4-2-2-1');
            sec5.innerText = `${data.humidity}%`
        })

    }

})