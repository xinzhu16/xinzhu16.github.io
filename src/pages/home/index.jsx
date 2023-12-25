import { Link } from 'react-router-dom';
import reactLogo from '../../assets/react.svg';
import './index.less';

function App() {
  return (
    <div>
      <Link to="test">test</Link>
      <a href="https://react.dev" target="_blank" rel="noreferrer">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
    </div>
  );
}

export default App;
