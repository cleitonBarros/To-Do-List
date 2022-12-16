const texto = document.querySelector('input')
const btnInsert = document.querySelector('.boxInsert button')
const ul = document.querySelector('ul')
const spanOpen  = document.querySelector('.open')
const spanFinished = document.querySelector('.finished')


let contCreateTask = 0
let contFinishedTask = 0
let itensDB = []
let dados = []


texto.addEventListener('keypress', event =>{
    if(event.key == 'Enter' && texto.value != ''){
        setItemLocalStorage()
    }
    texto.focus()
})

btnInsert.onclick = () =>{
  texto.value != "" ? setItemLocalStorage() : alert('prencha o campo')
  texto.focus()

}



function setItemLocalStorage(){
    itensDB= localStorage.getItem('ListToDo') ? JSON.parse(localStorage.getItem('ListToDo')) : []
    //dados =  localStorage.getItem('created_finished') ? JSON.parse(localStorage.getItem('created_finished')) : []

    if(itensDB.length >= 20 ){
      alert("maximo de 20 itens atigindo") 
    }else{
      contCreateTask ++
      
      itensDB.push({
        'item': texto.value,
        'status':'',
        'created': contCreateTask,
        'finished': contFinishedTask
    })
      
    }
    updateDB()
}




function updateDB(){
    localStorage.setItem('ListToDo', JSON.stringify(itensDB))
  //  localStorage.setItem('created_finished', JSON.stringify(dados))
    loadItems()

}

function loadItems(){
    ul.innerHTML = ""
    itensDB = JSON.parse(localStorage.getItem('ListToDo')) ?? []
   // dados=  JSON.parse(localStorage.getItem('created_finished')) ?? []
    itensDB.forEach((item, index)=>{
        inserItemOnScreen(item.item, item.status, item.created, item.finished,index)
    })
   // dados.forEach((item)=>{inserItemOnScreen(item.contCreateTask, item.contFinishedTask)})

}
function inserItemOnScreen(text, status, created, finished, index ){
    const li = document.createElement('li')
    
    li.innerHTML = `
    <div class="divLi">
      <input type="checkbox" ${status} data-i=${index} onchange="done(this, ${index});" />
      <span data-si=${index}>${text}</span>
      <button disabled="true" onclick="removeItem(${index , created, finished})" data-i=${index}><i class='fa-solid fa-trash'></i></button>
    
    `
    spanOpen.innerHTML=`${created}`
    spanFinished.innerHTML = `${finished}`
  ul.prepend(li)
  
  if (status) {
    document.querySelector(`[data-si="${index}"]`).classList.add('line-through')
  } else {
    document.querySelector(`[data-si="${index}"]`).classList.remove('line-through')
  }

  texto.value = ''
}

function done (chk, i){   

  const button = document.querySelector('li .divLi button')

  if (chk.checked) {
    itensDB[i].status = 'checked' 
    button.disabled = false
  } else {
    itensDB[i].status = ''
    button.disabled = true;
  }
 // chk.checked ? itensDB[index].status = 'checked' : itensDB[index].status = '' 
  updateDB()
}

function removeItem(i) {
    itensDB.splice(i, 1)
   
    updateDB()
}
  
loadItems()