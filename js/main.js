const text = document.querySelector('input')
const btnInsert = document.querySelector('.boxInsert button')
const btnDelete = document.querySelector('header button')
const ul = document.querySelector('ul')


let itens = []
btnDelete.onclick = () => {
    itens.clear()
}

text.addEventListener('keypress', event =>{
    if(event.key === "Enter" && text.value !== ''){
        setItemLocalStorage()
    }
})

btnInsert.onClick = () =>{
    if(text.value !== ''){
        setItemLocalStorage()
    }
}
function setItemLocalStorage(){
    
    //listaToDo = localStorage.getItem('ListaToDo') ? JSON.parse(localStorage.getItem('ListaToDo')) : []
    
    itens.length >= 20 ? alert('limite maximo ') : null
    
    itens.push(
        {
            'item': text.value,
            'status': ''
        }
    )
    localStorage.setItem('listaToDo', JSON.stringify(itens))
    loadItems()
}
function loadItems(){
    ul.innerHtml = ""
    itens = JSON.parse(localStorage.getItem('ListaToDo')) ?? []
    itens.forEach((item, index)=>{
        insertItemScreen(item.item,item.status,index)
    })

}
function insertItemScreen(text, status, index) {
    const li = createElement('li')

    li.innerHtml = `
    
      <input type="checkbox" ${status} data-i=${index} onchange="done(this, ${index});" />
      <span data-si=${i}>${text}</span>
      <button onclick="removeItem(${index})" data-i=${index}><i class='bx bx-trash'></i></button>
    
    `
  ul.prepend(li)

  if (status) {
    document.querySelector(`[data-si="${i}"]`).classList.add('line-through')
  } else {
    document.querySelector(`[data-si="${i}"]`).classList.remove('line-through')
  }

  text.value = ''

}
function done (chk, index){
    chk.checked ? itens[index].status = 'checked' : itens[index].status = ''

    localStorage.setItem('listaToDo', JSON.stringify(itens))
    loadItems()
}

function removeItem(index){
    itens.splice(index, 1)

    localStorage.setItem('listaToDo', JSON.stringify(itens))
    loadItems()
}



loadItems()

