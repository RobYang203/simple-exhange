import { CssBaseline } from "@material-ui/core";
import LoadingMask from "components/LoadingMask";
import MainLayout from "layouts/MainLayout";
import HistoryPage from "pages/HistoryPage";
import MainPage from "pages/MainPage";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <CssBaseline/>
      <MainLayout>
        <Switch>
          <Route path="/" component={MainPage} />
          <Route path="/history" component={HistoryPage} />
        </Switch>
      </MainLayout>
      <LoadingMask/>
    </div>
  );
}

export default App;
