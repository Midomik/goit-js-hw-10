export function fetchBreeds(catBase) {
    const params = new URLSearchParams({
        
    })
    return fetch("https://api.thecatapi.com/v1/breeds?"+catBase).then(res =>{
        if (res.status===200){
            return res.json();
            }
        throw new Error(res.statusText);
        
    });
    
}



export function fetchCatByBreed(listBreeds) {
    
    return fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${listBreeds.value}`).then(item => {
        if (item.status=200){
            return item.json();
        }
        throw new Error(item.statusText)
    });
    
}