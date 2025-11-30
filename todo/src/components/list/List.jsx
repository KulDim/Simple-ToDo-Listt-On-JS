
import styles from "./List.module.css"

function List({list, onChangeMode}){
    return <div>
        {list.map((item) => {
            return <div key={item.id} className={styles.list}>
                <div>
                    {!item.edit ?                   <>  <input 
                        onClick={() => onChangeMode(item.id, "checkbox")}
                        checked={item.checkbox}
                        type="checkbox" 
                        readOnly
                    /><span onClick={() => onChangeMode(item.id, "checkbox")}>{item.note}</span>
                    </>: <>
                        <input 
                        checked={item.checkbox}
                        type="checkbox" 
                        readOnly
                    />
                    <input type="text" value={item.note} onChange={(e) => onChangeMode(item.id, "save", e.target.value)}/>
                    </>}
                </div>
                <div>
                    <button onClick={() => onChangeMode(item.id, "edit")}>{item.edit ? "save": "edit"}</button>
                    <button onClick={() => onChangeMode(item.id, "dell")}>dell</button>
                </div>
            </div>
        })}
    </div>
}

export default List