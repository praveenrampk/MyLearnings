const Editing = ({ obj, editing, input, setInput }) => {
    const save =_=> {
        input(obj);
        editing(obj);
        setInput('');
    }
    const cancel =_=> {
        editing(obj);
        setInput('');
    }
    return (
        <div>
            <button onClick={save}>save</button>
            <button onClick={cancel}>cancel</button>
        </div>
    )
  }
  export default Editing;