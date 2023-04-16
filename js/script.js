"use strict";

// ! SELECTORS START
let headerBanner = document.querySelector("#header-banner").innerHTML = 
`
    <input id="header-banner-input" type="text" placeholder="Search for free photos"> 
    <button id="searchBtn" ><a href="#">Search</a></button>
`;
let mainBoxImg = document.querySelector("#main-box-img");
let auth = "Apm5hsvUVNp65gaBn4DSdpt22GR2pNgHe4KkFtyfPehW5eTHnkfEYctS";
let next = document.querySelector("#next");
let input = document.querySelector("input");
let searchButton = document.querySelector("#searchBtn")
// ! SELECTORS END

let page1 = 1;
let search = false;
let query = "";

input.addEventListener("input", (e)=>{
    e.preventDefault();
    query=e.target.value;
});

async function correctedPhotos(page1) {
    const data = await fetch(`
    https://api.pexels.com/v1/search?query=landscape&per_page=20&page=${page1}`,{method:"GET",headers : {
        Accept  : "application/json",
        Authorization : auth,

            },
        }
    
    );
    const result = await data.json();
    result.photos.forEach(photo => {
        const pic = document.createElement("div");
        pic.innerHTML=`<img src=${photo.src.large}>
        <p>Photo : ${photo.photographer}</p>
        <a href="${photo.src.large}">Download</a>
        `;
        document.querySelector("#main .container").appendChild(pic)
    });
};


async function SearchPhotos( query, page1) {
    const data = await fetch(`
    https://api.pexels.com/v1/search?query=${query}&per_page=20&page=${page1}`,
    {method:"GET",headers : {
        Accept  : "application/json",
        Authorization : auth,

            },
        }
    
    );
    const result = await data.json();
    result.photos.forEach(photo => {
        const pic = document.createElement("div");
        pic.innerHTML=`<img src=${photo.src.large}>
        <p>Photo : ${photo.photographer}</p>
        <a href="${photo.src.large}">Download</a>
        `;
        document.querySelector("#main .container").appendChild(pic)
    });
};

searchButton.addEventListener("click" , ()=>{
    if(input.value==="")return;
    clear();
    search = true ;
    page1++;
    SearchPhotos(query,page1);
})

function clear () {
    input.value="";
    document.querySelector("#main .container").innerHTML =  ``;
    page1 = 1;
}

next.addEventListener("click" , ()=>{
    if(!search){
        page1++;
        correctedPhotos(page1)
    }
    else{
        if(query.value==="") return;
        page1++;
        SearchPhotos(query,page1)
    }
})
correctedPhotos(page1);