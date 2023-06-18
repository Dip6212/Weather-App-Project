let first_tab=document.querySelector(".tab1");
let second_tab=document.querySelector(".tab2");
let third_tab=document.querySelector(".tab3");
let forth_tab=document.querySelector(".tab4");
let box1=document.querySelector(".box_1");
let box2=document.querySelector(".box_2");
let box3=document.querySelector(".box_3");
let box4=document.querySelector(".box_4");

let current_tab=first_tab;
current_tab.classList.add("normal_tab");


function switchTab(clickedTab){

    if(current_tab!=clickedTab){
        current_tab.classList.remove("normal_tab");
        current_tab.classList.remove("clicked_tab");
        current_tab=clickedTab;
        current_tab.classList.add("clicked_tab");
    }
    else{
        current_tab.classList.remove("normal_tab");
        current_tab.classList.add("clicked_tab");
    }

    if(clickedTab==first_tab){
        box2.classList.remove("active");
        box3.classList.remove("active");
        box1.classList.add("active");
    }

    if(clickedTab==second_tab){
        box1.classList.remove("active");
        box3.classList.remove("active");
        box2.classList.add("active");
    }

    if(clickedTab==third_tab){
        box2.classList.remove("active");
        box1.classList.remove("active");
        box3.classList.add("active");
    }
    if(clickedTab==forth_tab){
        box2.classList.remove("active");
        box1.classList.remove("active");
        box3.classList.add("active");
    }
}

first_tab.addEventListener('click', ()=>{
    switchTab(first_tab);
});

second_tab.addEventListener('click', ()=>{
    switchTab(second_tab);
});

third_tab.addEventListener('click', ()=>{
    switchTab(third_tab);
});














