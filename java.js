

function getStart(event){
  

    const nameInput=document.getElementById('name')
    const passInput=document.getElementById('pass')
    console.log(nameInput.value)
    console.log(passInput.value)
    if(nameInput.value){
        if(passInput.value==123456 ){
            // alert('login is successfull')
            Swal.fire({
                title: "অভিনন্দন 🎉",
                text: "আপনি সফলভাবে লগ ইন করেছেন",
                icon: "success",
                confirmButtonText: "ঠিক আছে",
                confirmButtonColor: "#3085d6",
            });
          
            document.getElementById('hero').classList.add('hidden')
            document.getElementById('navbar').classList.remove('hidden')
            document.getElementById('learn-vocabulary').classList.remove('hidden')
            document.getElementById('FAQ').classList.remove('hidden')
            
        }   
        else{
            alert('Wrong Password Contact admin to get your Login Code')
        }
    }
   
    else{
        alert('Please Tell use your Name first')
    }
    event.preventDefault();
    return passInput.value;
}
const logout=()=>{
    // event.preventDefault();
    document.getElementById('hero').classList.remove('hidden')
    document.getElementById('navbar').classList.add('hidden')
    document.getElementById('learn-vocabulary').classList.add('hidden')
    document.getElementById('FAQ').classList.add('hidden')
    // alert('logout successfully')
    Swal.fire({
        title: "লগআউট সফল হয়েছে",
        text: "আপনি লগআউট করেছেন",
        icon: "success",
        confirmButtonText: "ঠিক আছে",
        confirmButtonColor: "#3085d6",
    });
}
function removeActiveClass(){

const activeClass=document.getElementsByClassName('active')
for(let item of activeClass){
  item.classList.remove('active')
}
}

function lessonLoader(){
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then(res=>res.json())
    .then(data=>lessonBtnLoader(data.data))
}
 function lessonBtnLoader(lesson){
  console.log(lesson)
    for(let item of lesson){
        console.log(item.lessonName)
    const div=document.getElementById('lesson-btn')
    const button=document.createElement('button')
        button.innerHTML=`<button id='${item.level_no}'  onclick='lessonCardDataLoad(${item.level_no})' onclick='spinning(${item.level_no})' class="flex items-center gap-2 rounded-md px-6 py-3 outline outline-2 outline-[#422AD5]  font-bold  text-[#422AD5] space-x-1  "> <img class='h-3' src="assets/fa-book-open.png" alt="">Lesson -${item.level_no}</button>`
    div.appendChild(button)
    }
}
lessonLoader()




function lessonCardDataLoad(id){

    const url=`https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then(res=>res.json())
    .then(card=>{
      const addClass=document.getElementById(`${id}`)
      // console.log(addClass)
      removeActiveClass()
      
      addClass.classList.add('active')
      displayLessonData(card.data)})
   

}



function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = 'en-EN'; // English
  window.speechSynthesis.speak(utterance);
}

// const displayLessonData=(cardInfo)=>{
//     const cardContainer=document.getElementById('card-container')
    
//     const spinnerDiv = document.createElement('div');
//     spinnerDiv.innerHTML = `
//         <div class="loading loading-spinner loading-md text-center mx-auto mt-4"></div>
//     `;
    
//     cardContainer.innerHTML='';

    
//     if(cardInfo.length===0){
    
//       cardContainer.innerHTML=`<div class="py-16 text-center col-span-full space-y-4">
//       <img class="mx-auto" src="assets/alert-error.png" alt="">
//      <p class="  hind-siliguri font-normal text-sm">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
     
//       <h1 class=" hind-siliguri font-medium text-4xl mt-3">একটি Lesson Select করুন।</h1>
//   </div>`;
//      }
// for(let card of cardInfo){

//   console.log(card.level)
  
  
//     let nullValue= card.meaning?card.meaning:'অর্থ নেই'
    
//     const cardContainer=document.getElementById('card-container')
//     const div=document.createElement('div')
//     div.innerHTML=`<div  class="h-full grid grid-rows-6  p-14 bg-white rounded-xl">
//     <div class="space-y-6 row-span-4">
//       <h1 class=" text-center inter text-[32px] font-bold">${card.word}</h1>
//       <p class=" text-center inter text-[20px] font-medium">Meaning /Pronounciation</p>
//       <h1 class=" text-center hind-siliguri font-semibold text-[32px]">"<span id='null-value'>${nullValue}</span> / ${card.pronunciation}"</h1>
//     </div>
//     <div class='row-span-2'>
//     <div class="flex items-center justify-between mt-14 ">
//       <div onclick='modal(${card.id})' class="p-4 bg-[#F8F8F8] rounded-lg"><i class="fa-solid fa-circle-question" style="color: #4176d2;"></i></div>
//       <div onclick=" pronounceWord('${card.word}')" class="p-4 bg-[#F8F8F8] rounded-lg "><i class="fa-solid fa-volume-high" style="color: #115ee4;"></i></div>
//     </div>
//     </div>
    
//   </div>`
//   cardContainer.appendChild(div)
// }


// }



const displayLessonData = (cardInfo) => {
  const cardContainer = document.getElementById('card-container');
  
  
  cardContainer.innerHTML = '';

  
  const spinner = document.createElement('div');
  spinner.innerHTML = `
      <div class=" loading loading-dots loading-lg py-4 text-center mx-auto ml-[800px] col-span-full space-y-4"></div>
  `;
  cardContainer.appendChild(spinner); 

 
  setTimeout(() => {
      spinner.remove();  
     
      if (cardInfo.length === 0) {
          cardContainer.innerHTML = `
              <div class="py-16 text-center col-span-full space-y-4">
                  <img class="mx-auto" src="assets/alert-error.png" alt="">
                  <p class="hind-siliguri font-normal text-sm">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                  <h1 class="hind-siliguri font-medium text-4xl mt-3">নেক্সট Lesson এ যান</h1>
              </div>`;
      } else {
          
          for (let card of cardInfo) {
              let nullValue = card.meaning ? card.meaning : 'অর্থ নেই';

              const div = document.createElement('div');
              div.innerHTML = `
                  <div class="h-full grid grid-rows-6 p-14 bg-white rounded-xl">
                      <div class="space-y-6 row-span-4">
                          <h1 class="text-center inter text-[32px] font-bold">${card.word}</h1>
                          <p class="text-center inter text-[20px] font-medium">Meaning / Pronunciation</p>
                          <h1 class="text-center hind-siliguri font-semibold text-[32px]">"<span id='null-value'>${nullValue}</span> / ${card.pronunciation}"</h1>
                      </div>
                      <div class="row-span-2">
                          <div class="flex items-center justify-between mt-14">
                              <div onclick="modal(${card.id})" class="p-4 bg-[#F8F8F8] rounded-lg"><i class="fa-solid fa-circle-question" style="color: #4176d2;"></i></div>
                              <div onclick="pronounceWord('${card.word}')" class="p-4 bg-[#F8F8F8] rounded-lg"><i class="fa-solid fa-volume-high" style="color: #115ee4;"></i></div>
                          </div>
                      </div>
                  </div>`;
              cardContainer.appendChild(div);
          }
      }
  },700);  
};

function modal(id){
  console.log(id)
  const url=`https://openapi.programming-hero.com/api/word/${id}`
  console.log(url)
  fetch(url)
  .then(res=>res.json())
  .then(info=>detailLoader(info.data))
}
 
function detailLoader(details){
 
  
  document.getElementById('modal').showModal()
  const modalDetail=document.getElementById('modal-details')
  let nullValue= details.meaning?details.meaning:'অর্থ নেই'
  modalDetail.innerHTML=` <h1 class="font-semibold text-4xl poppins">${details.word}(<i class="fa-solid fa-microphone-lines"></i> : ${details.pronunciation})</h1>
    
  <h5 class="font-semibold text-2xl poppins mt-8 mb-3">Meaning</h5>
  <h5 class="hind-siliguri font-medium text-2xl ">${nullValue}</h5>
  <h1 class="mt-8 mb-2 text-2xl font-bold">Example</h1>
  <p class="pb-8 text-2xl font-normal poppins">${details.sentence}</p>
  <p  class="hind-siliguri font-medium text-2xl ">সমার্থক শব্দ গুলো</p>
  <div id="synonym" class='flex flex-wrap gap-2 mt-4'> 
</div>

 `
if (details.synonyms && details.synonyms.length > 0) {
  for (let item of details.synonyms) {
    console.log(item);

    const h1 = document.createElement('h1');
    h1.textContent = item;
    console.log(h1);
    h1.classList.add('poppins', 'font-normal', 'text-xl', 'rounded-md', 'py-2', 'px-5', 'bg-[#EDF7FF]');
    document.getElementById('synonym').appendChild(h1); // Append to the container
  }
}

}

//  lessonCardDataLoad()