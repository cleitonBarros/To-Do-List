const texto = document.querySelector('input')
const btnInsert = document.querySelector('.boxInsert button')
const btnDelete = document.querySelector('header button')
const ul = document.querySelector('ul')

let itensDB = []

btnDelete.onclick = () =>{
    itensDB = []
    updateDB()
}
texto.addEventListener('keypress', event =>{
    if(event.key == 'Enter' && texto.value != ''){
        setItemLocalStorage()
    }
})

btnInsert.onclick = () =>{
    if(texto.value !=""){
        setItemLocalStorage()
    }
}

function setItemLocalStorage(){
    if( itensDB.length >= 20 ){
        alert("maximo de 20 itens atigindo")
        return
    }

    itensDB.push({
        'item': texto.value,
        'status':''
    })
    updateDB()
}

function updateDB(){
    localStorage.setItem('ListToDo', JSON.stringify(itensDB))
    loadItems()
}

function loadItems(){
    ul.innerHTML = ""
    itensDB = JSON.parse(localStorage.getItem('ListToDo')) ?? []
    itensDB.forEach((item, index)=>{
        inserItemOnScreen(item.item, item.status, index)
    })
}
function inserItemOnScreen(text, status, index){
    const li = document.createElement('li')

    li.innerHTML = `
    <div class="divLi">
      <input type="checkbox" ${status} data-i=${index} onchange="done(this, ${index});" />
      <span data-si=${index}>${text}</span>
      <button onclick="removeItem(${index})" data-i=${index}><i class='bx bx-trash'></i></button>
    
    `
  ul.appendChild(li)
  ul.appendChild(li)

  if (status) {
    document.querySelector(`[data-si="${index}"]`).classList.add('line-through')
  } else {
    document.querySelector(`[data-si="${index}"]`).classList.remove('line-through')
  }

  texto.value = ''
}

function done (chk, index){
    
  if (chk.checked) {
    itensDB[index].status = 'checked' 
  } else {
    itensDB[index].status = '' 
  }

}

function removeItem(i) {
    itensDB.splice(i, 1)
    updateDB()
}
  
loadItems()