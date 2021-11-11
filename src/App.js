import { CssBaseline } from '@material-ui/core';
import { getExchangeInfoAction } from 'actionCreators/marketActions';
import LoadingMask from 'components/LoadingMask';
import useActionDispatch from 'hooks/useActionDispatch';
import MainLayout from 'layouts/MainLayout';
import HistoryPage from 'pages/HistoryPage';
import MainPage from 'pages/MainPage';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

function App() {
  const dispatches = useActionDispatch({ getExchangeInfoAction });
  dispatches.getExchangeInfoAction();
  return (
    <div className='App'>
      <CssBaseline />
      <MainLayout>
        <Switch>
          <Route path='/' component={MainPage} />
        </Switch>
      </MainLayout>
      <LoadingMask />
    </div>
  );
}

export default App;
