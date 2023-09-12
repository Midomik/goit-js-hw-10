import axios from "axios";
import { fetchBreeds } from "./js/cat-api";
import { fetchCatByBreed } from "./js/cat-api";
import SlimSelect from 'slim-select'



const catBase = axios.defaults.headers.common["x-api-key"] = "live_hPRucQ71EGzUuWlMZ5ZXEAV5shGTafIlK8DuYl3HSUpyAlvKjtLwmUyrq8bNzP8a";


const listBreeds = document.querySelector(".breed-select");
const msLoad = document.querySelector(".loader");
const msError = document.querySelector(".error");
const catField = document.querySelector(".cat-info");
const catFieldPhoto = document.querySelector(".cat-photo");
const catFieldDesc = document.querySelector(".cat-descr")

let count = 0;
let catImg;

function renderOption(arr,container){
    
    const markup = arr.map(item=>`<option value="${item.id}">${item.name}</option>`).join("");
    container.innerHTML = markup;

    // listBreeds.classList.replace("unvisible","visible");
    // msLoad.classList.replace("visible","unvisible");
  
}



fetchBreeds(catBase)
    .then(res=>{
        renderOption(res, listBreeds);
        console.log(res)
        listBreeds.classList.replace("unvisible","visible-flex");
        new SlimSelect({
            select: '#cat-select',
            settings: {
                showSearch: false,
                
            }
          })
        // msLoad.classList.replace("visible","unvisible");
        })
    .catch((err)=>{
        listBreeds.classList.replace("visible-flex","unvisible");
        msError.classList.replace("unvisible","visible");
        msLoad.classList.replace("visible","unvisible");
        console.log(err)
        })
    .finally(()=>{
        msLoad.classList.replace("visible","unvisible");
        
        });




 function renderCatInfo (){
    fetchCatByBreed(listBreeds)
        .then(item => {
            listBreeds.classList.replace("visible-flex","unvisible");
            catField.classList.replace("visible-flex","unvisible");
            msLoad.classList.replace("unvisible","visible");
            fetchBreeds(catBase)
                .then(res =>{
                    const catInfo = res.find(catItem=>catItem.id===listBreeds.value);
                    const markupPhoto = `<img class="cat-img" src="${item[0].url}" width="500" alt="Photo ${catInfo.name}"/>`;
                    const markupInfo=`<h2 class="cat-breed">${catInfo.name}</h2>
                    <p class="cat-desc">${catInfo.description}</p>
                    <p class="cat-temp">${catInfo.temperament}</p>`
                    catFieldPhoto.innerHTML = markupPhoto;
                    catFieldDesc.innerHTML = markupInfo;
                    
                    
                    msLoad.classList.replace("visible","unvisible");
                    catField.classList.replace("unvisible","visible-flex");
                    msError.classList.replace("visible","unvisible");
                    })
                .catch((err)=>{
                    msError.classList.replace("unvisible","visible");
                    msLoad.classList.replace("visible","unvisible");
                    console.log(err);
                    })
                .finally(()=>{
                    listBreeds.classList.replace("unvisible","visible-flex");

                    
                })
            })
        .catch((err)=>{
            msError.classList.replace("unvisible","visible")
            console.log(err)})
    

   
    
    
 }


    
 



listBreeds.addEventListener("change", renderCatInfo);
