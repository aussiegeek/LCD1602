import "./App.css";
import { characters } from "./characters";

function App() {
  return (
    <div>
      <p className="LCD">
        ABCDEFGHIJKLMNOPQRSTUVWXYZ
        <br />
        abcdefghijklmnopqrstuvwxyz
        <br />
        01234567890
      </p>

      <p className="LCD">The quick brown fox jumps over the lazy dog.</p>

      <p className="LCD">{Object.keys(characters)}</p>
    </div>
  );
}

export default App;
