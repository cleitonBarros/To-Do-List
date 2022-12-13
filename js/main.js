const text = document.querySelector('input')
const btnInsert = document.querySelector('.boxInsert button')
const btnDelete = document.querySelector('header button')
const ul = document.querySelector('ul')

let listaToDo = []
function setItemLocalStorage(){
    
    listaToDo = localStorage.getItem('ListaToDo') ? JSON.parse(localStorage.getItem('ListaToDo')) : []
    
    listaToDo.length >= 20 ? alert('limite maximo ') : null
    
    listaToDo.push(
        {
            'item': text.value,
            'status': ''
        }
    )
    localStorage.setItem('listaToDo', JSON.stringify(listaToDo))
    loadItems()
}
function loadItems(){
    ul.innerHtml = ""
    listaToDo = JSON.parse(localStorage.getItem('ListaToDo')) ?? []
    listaToDo.forEach((item, index)=>{
        insertItemScreen(({item}), {status},)
    })

}

text.addEventListener('keypress', event =>{
    event.preventDefault()

    if(event.key === "Enter" && text.value !== ''){
        setItemLocalStorage()
    }
})

btnInsert.onClick = () =>{
    if(text.value !== ''){
        setItemLocalStorage()
    }
}