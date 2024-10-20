function showPets(){
    document.getElementById('spinner').style.display = 'none'
    document.getElementById('AllPets').classList.remove('hidden');
    document.getElementById('petBox').classList.remove('hidden');
}

function hidePets(){
    document.getElementById('spinner').style.display = 'block'
    document.getElementById('AllPets').classList.add('hidden');
   document.getElementById('petBox').classList.add('hidden');
}