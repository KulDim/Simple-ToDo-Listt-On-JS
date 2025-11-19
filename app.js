const $list = document.querySelector("#list")

const list = [
    {id: 0, note: "hello", checked: false},
    {id: 1, note: "hello 2", checked: true},
    {id: 2, note: "hello 2", checked: true},
    {id: 3, note: "hello 2", checked: true},
    {id: 4, note: "hello 2", checked: true},
    {id: 5, note: "hello 2", checked: true},
    {id: 6, note: "hello 2", checked: true},
    {id: 7, note: "hello 2", checked: true},
    {id: 8, note: "hello 2", checked: true},
    {id: 9, note: "hello 2", checked: true},
    {id: 10, note: "hello 2", checked: true},
    {id: 11, note: "hello 2", checked: true},
    {id: 12, note: "hello 2", checked: true},
]


console.log($list);

function renderList(){
    $list.innerHTML = ""
    list.map((item) => {
        $list.innerHTML += `                
            <div class="item" data-id="${item.id}">
                <label for="item_${item.id}">
                    <input class="checkbox" type="checkbox" id="item_${item.id}" name="item_${item.id}" value="true" ${item.checked ? "checked" : ""}>
                    <span class="checkbox" ${item.checked ? "style='text-decoration: line-through'" : ""}>${item.note}</span>
                </label>
                <div class="controler">
                    <button>edit</button>
                    <button>dell</button>
                </div>
            </div>`
    })
}

function renderListById(id){

    for(item of list){
        if(item.id === id){
            const itemToDo = document.querySelector(`[data-id="${id}"]`);
            itemToDo.innerHTML = `                
                <label for="item_${item.id}">
                    <input class="checkbox" type="checkbox" id="item_${item.id}" name="item_${item.id}" value="true" ${item.checked ? "checked" : ""}>
                    <span class="checkbox" ${item.checked ? "style='text-decoration: line-through'" : ""}>${item.note}</span>
                </label>
                <div class="controler">
                    <button>edit</button>
                    <button>dell</button>
                </div>`
            break
        }
    }
}



renderList()
$list.addEventListener("click", (e) => {
    const itemElement = e.target.closest('.item');
    if (!itemElement) return;
    
    const itemId = parseInt(itemElement.dataset.id);
    const item = list.find(i => i.id === itemId);
    
    if (!item) return;

    const className = e.target.className


    if(className == "item" || className == "checkbox"){
        item.checked = !item.checked

    }
    

     renderListById(itemId)
})