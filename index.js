// load spinner
const loadFunction = () =>{
    hidePets()
    setTimeout(() =>{
        loadAllPets()
    },2000)
}
loadFunction()

document.getElementById('view-more-btn').addEventListener('click',function(){
    document.getElementById('main-section').scrollIntoView({behavior : 'smooth'})
    })
    
    const loadCategories = () => {
     fetch('https://openapi.programming-hero.com/api/peddy/categories')
            .then((res) => res.json())
            .then((data) => displayCategory(data.categories))
            .catch((error) => console.log(error));
    }
    
    const removeActiveClass = () =>{
        const buttons = document.getElementsByClassName("category-btn")
        console.log(buttons)
        for(let btn of buttons){
            btn.classList.remove('bg-main','text-white','hover:text-white','hover:bg-main', 'rounded-3xl')
        }
    }
    
    const displayCategory = (categories) => {
        const categoryContainer = document.getElementById("category");
        categories.forEach(btn => {
            const buttonContainer = document.createElement('div');
            buttonContainer.innerHTML = `
                <div>
                    <button id="btn-${btn.category}" class=" hover:bg-[#0E7A811A] rounded-md border-2 border-main py-3 px-6 font-bold text-lg flex items-center space-x-4 category-btn" onclick="loadButton('${btn.category}')">
                        <img src="${btn.category_icon}" alt="icon" class="w-8 h-8">
                        <span>${btn.category}</span>
                    </button>
                </div>
            `;
            categoryContainer.append(buttonContainer);
        });
    }
    
    const loadButton = (category) => {
        hidePets()
        setTimeout(() => {
            fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
                .then(res => res.json())
                .then(d => {
                    showPets()
                    removeActiveClass();
                    const activeBtn = document.getElementById(`btn-${category}`);
                    activeBtn.classList.add('bg-main','text-white','rounded-3xl','hover:text-white','hover:bg-main')
                    displayAllPets(d.data);
                    allPets = d.data
                })
                .catch(err => {
                    console.error('Error fetching category data:', err);   
                });
        }, 2000);
    };
    // modal
    const petDetails = async (petsId) => {
        const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petsId}`);
        const data = await res.json();
        displayDetails(data.petData);
    }
    
    const displayDetails = (petData) => {
        const detailContainer = document.getElementById("modal-content");
        detailContainer.innerHTML = `
            <img class="w-full" src="${petData.image}"/>
            <h3 class="text-xl font-bold pt-4">${petData.pet_name}</h3>
            <div class="text-sm text-gray-600 flex space-x-6">   
            <div>
            <div class="flex items-center space-x-1">
                    <img class="w-4 h-4 opacity-70" src="./images/grid.png" alt="">
                    <span class="font-semibold text-base opacity-70">Breed: ${petData.breed ? petData.breed : 'N/A'}</span>
                </div>
                <span class="font-semibold text-base opacity-70"><i class="fa-solid fa-mercury mr-2"></i>Gender: ${petData.gender ? petData.gender : 'N/A'}</span>
                <span class="block font-semibold text-base opacity-70"><i class="fa-solid fa-mercury mr-2"></i>vaccinated status: ${petData.vaccinated_status ?petData.vaccinated_status : 'N/A'}</span>
            </div>
              <div>
                <span class="block font-semibold text-base opacity-70"><i class="fa-regular fa-calendar-days mr-2"></i>Birth: ${petData.date_of_birth ? new Date(petData.date_of_birth).getFullYear() : 'N/A'}</span>
                <span class="block font-semibold text-base opacity-70"><i class="fa-solid fa-dollar-sign mr-2"></i>Price: ${petData.price ? petData.price : 'N/A'}$</span>
              </div>
            </div>
            <hr class="my-2">
            <h2 class="text-base font-bold">Details Information</h2>
            <h3 class="text-sm">${petData.pet_details}</h3>
        `;
        document.getElementById("customModal").showModal();
    }
    // pet container
    const markPet = (image) => {
        const petContainer = document.getElementById("pet-container");
        const div = document.createElement('div');
        div.innerHTML = `
        <img class="p-2 border-2 rounded-md" src="${image}"/> 
        `
        petContainer.appendChild(div);
    }
    
    // get all pets
    const loadAllPets = async () => {
        showPets()
        const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
        const data = await res.json();
        allPets = data.pets
        displayAllPets(allPets);
    }
    // sortByPrice 
    let allPets = []  
  const sortByPrice = () =>{
    hidePets()
    const sortPet = allPets.sort((a,b) => b.price - a.price)
    setTimeout(() =>{
        showPets()
        displayAllPets(sortPet)
    },2000)  
  }

    const displayAllPets = (pets) => {
        const petContainer = document.getElementById("AllPets");
        petContainer.innerHTML = ' '
        petContainer.classList.add('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'gap-8');
    
       if(pets.length == 0){
        petContainer.classList.remove('grid')
        petContainer.innerHTML = `
         <div class="flex flex-col items-center justify-center text-center space-y-5 ">
          <img src="./images/error.webp"/>
          <h1 class="font-bold text-2xl">No Available Information</h1>
         <p class="font-semibold">Currently, there is no information available about birds for adoption. <br> Please check back later or explore other pets.</p>
    
         </div>
        `
        return
       }
       
       else{
        petContainer.classList.add('grid')
       }
        pets.forEach(pet => {
            const div = document.createElement('div');
            div.innerHTML = `
                <div class="bg-white rounded-lg overflow-hidden border-2 p-4">
                    <img class="w-full h-40 mb-3 object-cover rounded-md" src="${pet.image}">
                    <div>
                        <h3 class="text-xl font-bold">${pet.pet_name}</h3>
                        <div class="text-sm text-gray-600">
                            <div class="flex items-center space-x-1">
                                <img class="w-4 h-4 opacity-70" src="./images/grid.png" alt="">
                                <span class="font-semibold text-base opacity-70">Breed: ${pet.breed ? pet.breed : 'N/A'}</span>
                            </div>
                            <span class="block font-semibold text-base opacity-70"><i class="fa-regular fa-calendar-days mr-2"></i>Birth: ${pet.date_of_birth ? pet.date_of_birth : 'N/A'}</span>
                            <span class="font-semibold text-base opacity-70"><i class="fa-solid fa-mercury mr-2"></i>Gender: ${pet.gender ? pet.gender : 'N/A'}</span>
                            <span class="block font-semibold text-base opacity-70"><i class="fa-solid fa-dollar-sign mr-2"></i>Price: ${pet.price ? pet.price : 'N/A'}$</span>
                        </div>
                        <hr class="my-2">
                        <div class="flex justify-between items-center mt-4">
                            <button onclick="markPet('${pet.image}')" class="py-1 px-4 text-xl border-2 rounded-lg hover:bg-main hover:text-white"><i class="fa-regular fa-thumbs-up"></i></button>
                            <button  onclick="AddoptPet(this)" class="px-4 py-2 rounded-lg border-2 text-main font-bold text-base hover:bg-main hover:text-white">Adopt</button>
                            <button onclick="petDetails(${pet.petId})" class="px-4 py-2 rounded-lg text-main font-bold border-2 text-base hover:bg-main hover:text-white">Details</button>
                        </div>
                    </div>
                </div>
            `;
            petContainer.appendChild(div);   
        });
    }

    loadCategories();

    // adopt modal
    const AddoptPet = (button) =>{
        const Modal = document.getElementById('Modal')
        const displayCount = document.getElementById('Display-Count')
        let timer = 3
        const countDownTimer = setInterval (() =>{
            timer--;
           displayCount.textContent = timer
            if(timer<=0){
                clearInterval(countDownTimer)
                Modal.close()
               button.disabled = true
                button.textContent = 'Adopted'
                button.classList.add('bg-gray-200','text-gray-400');
                button.classList.remove('hover:bg-main','hover:text-white')
            }
        },1000)
        Modal.showModal()
        displayCount.textContent = timer
    }