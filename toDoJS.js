const $list = document.querySelector("#list")
const $add = document.querySelector("#add")
const $modal = document.querySelector("#itemModal")
const $search = document.querySelector("#search")
const $searchMode = document.querySelector("#searchMode")



const storage = localStorage.getItem("list")
let list = []

if(storage){
    list = JSON.parse(storage);
}

$search.addEventListener("keyup", (e) => {
    // console.log('Клавиша отпущена:', e.target.value);
    const searchText = e.target.value.toLowerCase();
    
    const filteredList = list.filter(item => 
        item.note.toLowerCase().includes(searchText)
    );

     renderList(filteredList)

}) 

function renderList(list){
    $list.innerHTML = ""
    list.map((item) => {
        $list.innerHTML += `                
            <div class="item" data-id="${item.id}">
                <label for="item_${item.id}">
                    <input class="checkbox" type="checkbox" id="item_${item.id}" name="item_${item.id}" value="true" ${item.checked ? "checked" : ""}>
                    <span class="checkbox" ${item.checked ? "style='text-decoration: line-through'" : ""}>${item.note}</span>
                </label>
                <div class="controler">
                    ${!item.checked ? "<button id='edit'>edit</button>" : ""}
                    <button id="dell">dell</button>
                </div>
            </div>`
    })
}

function renderListById(id){
    
    for(item of list){
        if(item.id === id){
            const itemToDo = document.querySelector(`[data-id="${id}"]`);
            if(item.edit === true){
                itemToDo.innerHTML = `                
                    <label for="item_${item.id}">
                        <input type="text" name="note" value="${item.note}" id="inputNote">
                    </label>
                    <div class="controler">
                        <button id="save">save</button>
                        <button id="dell">dell</button>
                    </div>`
            }else{

                itemToDo.innerHTML = `                
                    <label for="item_${item.id}">
                        <input class="checkbox" type="checkbox" id="item_${item.id}" name="item_${item.id}" value="true" ${item.checked ? "checked" : ""}>
                        <span class="checkbox" ${item.checked ? "style='text-decoration: line-through'" : ""}>${item.note}</span>
                    </label>
                    <div class="controler">
                        ${!item.checked ? "<button id='edit'>edit</button>" : ""}
                        <button id="dell">dell</button>
                    </div>`
            }

            return
        }
    }
}

$list.addEventListener("click", (e) => {
    const itemElement = e.target.closest('.item');
    if (!itemElement) return;

    if(e.target.id == "inputNote") return
    
    
    const itemId = parseInt(itemElement.dataset.id);
    const item = list.find(i => i.id === itemId);
    
    if (!item) return;

    const className = e.target.className
    const id = e.target.id

    
    if(className == "item" || className == "checkbox"){
        item.checked = !item.checked
    }
    
    if(id == "dell"){
        removeItemByIdMutable(list, itemId);
        renderList(list)
    }
    
    if(id == "edit"){
        item.edit = true
    }

    if(id == "save"){
        item.edit = false
        item.note = itemElement.querySelector("#inputNote").value
    }
    localStorage.setItem("list", JSON.stringify(list))
    renderListById(itemId)
})

$add.addEventListener("click", (e) => {
    $modal.style.display = "block"
})

$modal.querySelector("[name='note']").addEventListener('keydown', (e) => {
    const input = $modal.querySelector("[name='note']")

    if (e.key === 'Enter') {
        addTodoInput(input)
    }
})

$modal.addEventListener("click", (e) => {
    const input = $modal.querySelector("[name='note']")

    if(e.target.id == "itemModal" || e.target.id == "cancel"){
        $modal.style.display = "none"
    }

    if(e.target.id == "apply"){
        addTodoInput(input)
    }
})


function addTodoInput(input){
    if(input.value == 0){
        input.placeholder = "Enter the value...";
        return
    }

    let id = 0

    if(list[0]){
        id = list[0].id + 1
    }
    

    list.unshift({
        id: id,
        note: input.value,
        checked: false,
        edit: false
    });

    $modal.style.display = "none"
    input.placeholder = "Input your note...";
    input.value = ""
    renderList(list)
    localStorage.setItem("list", JSON.stringify(list))
}

function removeItemByIdMutable(arr, id) {
    const index = arr.findIndex(item => item.id === id);
    if (index !== -1) {
        arr.splice(index, 1);
    }
    return arr;
}

renderList(list)