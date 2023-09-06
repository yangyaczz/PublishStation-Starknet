import { useConnectors } from "@starknet-react/core";

export default function Connect() {
  const { connect, connectors } = useConnectors();

  return (
    <div className="flex justify-center gap-8 flex-col">
      <h1 className="title text-4xl shadowed mb-8">LOOK FOR YOUR HACKATHON TEAMMATE</h1>
      {connectors.map((connector) => (
        <button
          className="btn"
          onClick={() => connect(connector)}
          key={connector.id()}
          disabled={!connector.available()}
        >
          Connect {connector.id()}
        </button>
      ))}
    </div>
  );
}
