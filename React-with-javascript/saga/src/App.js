import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCatsFetch } from './Cat';

const App =_=> {

  const {cats, isLoading} = useSelector(state => state.cats);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCatsFetch());
  }, []);

  console.log(cats);

  return (
    <div>
      {
        isLoading ? <p>Loading...</p> :<div>

      <h1>CAT SPECIOUS GALLERY</h1>
      <p>Images of different species.</p>
        { cats.map((cat) => {
          return (
          <div key={cat.id}>
          <img 
          alt={cat.name}
          src={cat.image}
          width='200'
          height='200'/>
        </div>)
        })}
      </div>
      }
      
    </div>
  )
}
export default App;