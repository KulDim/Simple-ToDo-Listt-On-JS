class ToDo{
    searchMode = "all"
    search = ""

    list = [
        {id: 0, node: "test", checkbox: false, edit: false},
        {id: 1, node: "test 1", checkbox: false, edit: false},
        {id: 2, node: "test 2", checkbox: false, edit: false},
        {id: 3, node: "test 3", checkbox: false, edit: false}
    ]

    constructor(element){
        this.todo = element
        this.#createInputSearch(this.todo)
        this.containerList = this.#createList(this.todo)
        this.#renderList(this.containerList, this.list)
        
        // this.#renderList(this.list, this.todo)  
    }
    
    #createInputSearch(element){
        const container = document.createElement("div")
        container.className = "search"

        const input = document.createElement("input")
        input.name = "search"
        input.id = "search"
        input.type = "text"
        input.addEventListener(("keyup"), (e) => {
            this.search = e.target.value            
        })

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

            if(items.checkbox){
                checkbox.checked = true
            }

            containerNote.append(checkbox)



            let edit = "div"
            if(items.edit){
                edit = "input"

            }
            const note = document.createElement(edit)
            if(items.edit){
                note.value = items.node
            }
            note.className = "note"
            note.textContent = items.node
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
            item.checkbox = !item.checkbox
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
            item.node = itemElement.querySelector(".note").value
            this.#renderList(this.containerList, this.list)            
        }

    }


}


new ToDo(document.querySelector("#toDo"))