class ToDo{
    searchMode = "all"
    search = ""
    list = []
    constructor(element){
        this.storage = localStorage.getItem("list")

        if(this.storage){
            this.list = JSON.parse(this.storage);
        }

        this.todo = element
        this.#createInputSearch(this.todo)
        this.#createInputAdd(this.todo)
        this.containerList = this.#createList(this.todo)
        this.#renderList(this.containerList, this.list)        
    }

    #createInputAdd(todo){

        const input = document.createElement("input")
        input.name = "add"
        input.id = "add"
        input.type = "text"

        const buttonAdd = document.createElement("button")
        buttonAdd.textContent = "add todo"
        buttonAdd.className = "add"

        buttonAdd.addEventListener("click", (e) => {
            if(!input.value) return

            const id = this.list.length > 0 ? Math.max(...this.list.map(item => item.id)) + 1 : 1;            
            
            this.list.unshift({
                id: id,
                note: input.value,
                checked: false,
                edit: false
            });
            input.value = ""
            this.#renderList(this.containerList, this.list)
            localStorage.setItem("list", JSON.stringify(this.list))                    
        })


        todo.append(input)
        todo.append(buttonAdd)
    }

    #createInputSearch(element){
        const container = document.createElement("div")
        container.className = "search"

        const input = document.createElement("input")
        input.name = "search"
        input.id = "search"
        input.type = "text"

        input.addEventListener(("keyup"), (e) => this.#controlerSearch(e))

        const select = document.createElement("select")
        select.id = "searchMode"

        const options = ["all", "complete", "incomplete"]
        options.forEach((item) => {
            const option = document.createElement("option")
            option.value = item
            option.textContent = item
            select.appendChild(option);
        })

        select.addEventListener("change", (e) => {
            this.searchMode = e.target.value
            const fakeEvent = {
                target: input,
                type: 'change'
            }
            this.#controlerSearch(fakeEvent)
                    
        })

        container.appendChild(input);
        container.appendChild(select);
        element.append(container)
    }

    #createList(todo){
        const container = document.createElement("div")
        container.className = "list"
        container.addEventListener("click", this.#controlerList.bind(this))
        todo.append(container)
        return container
    }

    #renderList(containerList, list){
        containerList.innerHTML = ""
        list.forEach(items => {
            const item = document.createElement("div")
            item.className = "item"
            item.id = items.id
            
            const containerNote = document.createElement("div")
            containerNote.className = "containerNote"

            const checkbox = document.createElement("input")
            checkbox.type = "checkbox"
            checkbox.className = "checkbox"

            if(items.checked){
                checkbox.checked = true
            }else{
                checkbox.checked = false
            }

            containerNote.append(checkbox)

            let edit = "div"
            if(items.edit){
                edit = "input"
            }

            const note = document.createElement(edit)
            if(items.edit){
                note.value = items.note
            }
            note.className = "note"
            note.textContent = items.note
            containerNote.append(note)


            const containerControler = document.createElement("div")
            containerControler.className = "containerControler"


            const buttonEdit = document.createElement("button")
            if(items.edit){
                buttonEdit.textContent = "Save"
                buttonEdit.className = "save"
            }else{
                buttonEdit.textContent = "Edit"
                buttonEdit.className = "edit"
                
            }

            const buttonDell = document.createElement("button")
            buttonDell.textContent = "Dell"
            buttonDell.className = "dell"
            
            item.append(containerNote)

            containerControler.append(buttonEdit)
            containerControler.append(buttonDell)
            item.append(containerControler)
            containerList.append(item)
        })
    }

    #controlerList(e){
        const itemElement = e.target.closest('.item')
        const itemClassName = e.target.className

        const itemId = parseInt(itemElement.id);        
        const item = this.list.find(i => i.id === itemId)        
        
        if(itemClassName == "checkbox"){
            item.checked = !item.checked
        }
        if(itemClassName == "dell"){
            const index = this.list.findIndex(item => item.id === itemId);
            if (index !== -1) {
                this.list.splice(index, 1);
            }
            this.#renderList(this.containerList, this.list)
        }
        if(itemClassName == "edit"){
            item.edit = true
            this.#renderList(this.containerList, this.list)
        }
        if(itemClassName == "save"){
            item.edit = false
            item.note = itemElement.querySelector(".note").value
            this.#renderList(this.containerList, this.list)            
        }
        localStorage.setItem("list", JSON.stringify(this.list))  
    }

    #controlerSearch(e) {
        this.search = e.target.value;
        const searchText = this.search.toLowerCase();
        
        const listItems = this.list.filter(item => {
            if (this.searchMode === "complete") {
                return item.checked
            } else if (this.searchMode === "incomplete") {
                return !item.checked
            } else {
                return true
            }
        })

        const filteredList = listItems.filter(item => 
            item.note.toLowerCase().includes(searchText)
        )
        
        this.#renderList(this.containerList, filteredList)
    }
}


new ToDo(document.querySelector("#toDo"))