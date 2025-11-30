import { useState } from "react";
import "./App.css";
import List from "./components/list/List";
import Search from "./components/search/search";
import ListAdd from "./components/listAdd/ListAdd";

const list = [
	{ id: 0, note: "test", checkbox: false, edit: false },
	{ id: 1, note: "hello word", checkbox: false, edit: false },
];

function App() {
	const [items, setItems] = useState(list);

	function handlerController(id, mode, value = "") {
		if (mode == "checkbox") {
			setItems((prevItems) =>
				prevItems.map((item) => (item.id === id ? { ...item, checkbox: !item.checkbox } : item))
			);
		}

		if (mode == "dell") {
			setItems((prevItems) => 
				prevItems.filter((item) => item.id !== id)
			)
		}

		if (mode == "edit") {
			setItems((prevItems) =>
				prevItems.map((item) => (item.id === id ? { ...item, edit: !item.edit} : item))
			);
		}


		if (mode == "save") {
			setItems((prevItems) =>
				prevItems.map((item) => (item.id === id ? { ...item, note: value} : item))
			);
		}		
	}

	function handlerListadd(value){
		const newItem = {
			id: Date.now(),
			note: value,
			checkbox: false
		};
    	setItems(prevItems => [newItem, ...prevItems]);
	}

	return (
		<div className="App">
			<Search />
			<ListAdd handlerListadd={handlerListadd}/>
			<List list={items} onChangeMode={handlerController} />
		</div>
	);
}

export default App;
