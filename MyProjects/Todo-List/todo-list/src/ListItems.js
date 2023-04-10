import Editing from './Editing';
import '../src/App.css';

const ListItems = ({ obj, changeFunction, editing, input, setInput }) => {
    return (
        <div className={obj.completed === true? 'completed' : '' }>
            <p>{obj.name}</p>
            <div>
                {obj.edit === true ? <Editing obj={obj} editing={editing} setInput={setInput} input={input}/> 
                :
                <div>
                    <button onClick={() => changeFunction({type: 'done', item: obj})}>Done</button>
                    <button onClick={() => editing(obj)}>Edit</button>
                    <button onClick={() => changeFunction({type: 'delete', item: obj})}>Delete</button>
                </div>
                }
            </div>
        </div>
    )
}
export default ListItems;