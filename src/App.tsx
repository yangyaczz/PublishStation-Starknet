import { useAccount } from "@starknet-react/core";
import Connect from "./components/Connect";
import Info from "./components/Info";
import NetworkInfo from "./components/NetworkInfo";
import PublishForm from "./components/PublishForm";
import ResultForm from "./components/ResultForm";


function App() {
  const { isConnected, address } = useAccount();

  return (
    <div className="h-full p-4 flex flex-col">
      <Info />
      <div className="flex-1 flex items-center text-center justify-center h-full">
        {isConnected ? (
          <div>
            <h1 className="title text-4xl shadowed mb-8">Publish</h1>
            <p>Hello, {address}</p>
            <PublishForm />
            <ResultForm />
          </div>
        ) : (
          <Connect />
        )}
        <NetworkInfo />
      </div>
    </div>
  );
}

export default App;
