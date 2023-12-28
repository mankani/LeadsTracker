
// let myleads =  `["awesomelead.com"]`
// myleads = JSON.parse(myleads)
// myleads.push("example.com")
// console.log(myleads)
// myleads = JSON.stringify(myleads)
// console.log(typeof myleads)

myleads = []

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const dltBtn = document.getElementById("dlt-btn")
const tabBtn = document.getElementById("tab-btn")

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myleads"))
if(leadsFromLocalStorage){
    myleads = leadsFromLocalStorage
    render(myleads)
}
console.log(leadsFromLocalStorage)

inputEl.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      inputBtn.click();
    }
});

// const mytab = [
//     {url: "https://www.wikipedia.org"}
// ]

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(mytab){
        myleads.push(mytab[0].url)
        localStorage.setItem("myleads", JSON.stringify(myleads))
        render(myleads)
    })
})

dltBtn.addEventListener("click", function(){
    localStorage.clear()
    myleads = []
    render(myleads)
})

inputBtn.addEventListener("click", function(){
    if(inputEl.value!= ""){
        myleads.push(inputEl.value)
    }
    inputEl.value = ''
    localStorage.setItem("myleads", JSON.stringify(myleads))
    render(myleads);

    console.log(localStorage.getItem("myleads"))
})

function dltonce(i){

    myleads.splice(i,1);
    inputBtn.click();

    // var button = document.getElementById(btnID);
    // button.style.display = "none";

}

function render(leads){
    let listItems = ""
    for(let i = 0; i< leads.length; i++){
        // listItems += "<li><a  target = '_blank' href= ' " + leads[i] + " '>" + leads[i] + "</a></li>"
        listItems += `<li>
                        <a style="text-decoration: none" target = '_blank' href= '${leads[i]}'> 
                            ${leads[i]}
                        </a>
                        <button onclick = "dltonce(${i})">-</button>
                    </li>`
        // console.log(listItems)
        
    }
    ulEl.innerHTML = listItems
}

// for(let i = 0; i< myleads.length; i++){
//     ulEl.innerHTML += "<li>" + myleads[i] + " " + "</li>"

// //      creating a element li
// //      set text content
// //      appending it to ul

//         // let li = document.createElement("li")
//         // li.textContent = myleads[i]
//         // ulEl.append(li)
// }




// function buttonClick(){
//     console.log("Button Clicked from on-click attribute")
// }
// console.log(leads)