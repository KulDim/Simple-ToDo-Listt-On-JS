const $list = document.querySelector("#list")
const $add = document.querySelector("#add")
const $modal = document.querySelector("#itemModal")

const list = [
    {id: 0, note: "hello", checked: false},
    {id: 1, note: "hello 2", checked: true},
    {id: 2, note: "hello 2", checked: true},
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

$add.addEventListener("click", (e) => {
    $modal.style.display = "block"
})

$modal.addEventListener("click", (e) => {

    if(e.target.id == "itemModal" || e.target.id == "cancel"){
        $modal.style.display = "none"
    }

    if(e.target.id == "apply"){
        const input = $modal.querySelector("[name='note']")
        if(input.value == 0){
            input.placeholder = "Enter the value...";
            return
        }
        list.push({
            id: list.length,
            note: input.value,
            checked: false
        })
        $modal.style.display = "none"
        input.placeholder = "Input your note...";
        input.value = ""
        renderList()
    }
})