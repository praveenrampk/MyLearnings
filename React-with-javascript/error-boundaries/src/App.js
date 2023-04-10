import ErrorBoundary from "./ErrorBoundary";
import Counter from "./Counter";

const App =_=> {
  return (
    <div>
      Error Boundaries
      <ErrorBoundary>
        <Counter/>
      </ErrorBoundary>
    </div>
  )
}
export default App;