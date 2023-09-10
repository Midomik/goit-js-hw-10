import axios from "axios";
import { fetchBreeds } from "./js/cat-api";
import { fetchCatByBreed } from "./js/cat-api";

const catBase = axios.defaults.headers.common["x-api-key"] = "live_hPRucQ71EGzUuWlMZ5ZXEAV5shGTafIlK8DuYl3HSUpyAlvKjtLwmUyrq8bNzP8a";


const listBreeds = document.querySelector(".breed-select");
const msLoad = document.querySelector(".loader");
const msError = document.querySelector(".error");
const catField = document.querySelector(".cat-info")


function renderOption(arr,container){
    const markup = arr.map(item=>`<option value="${item.id}">${item.name}</option>`).join("");
    
    container.innerHTML = markup;
}

 function renderCatInfo (e){
    
    //  const markup = arrImg.map(item => `<img src="${item.url}"/>
    //   `)
    fetchBreeds(catBase).then(res=>{
        renderOption(res, listBreeds);
        console.log("asadsadsa")
    });
    
 }

 fetchCatByBreed(listBreeds).then(item => {
    renderCatInfo(item);
    
})








listBreeds.addEventListener("change", renderCatInfo);
