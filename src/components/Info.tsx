import { useAccount, useConnectors, useStarkName } from "@starknet-react/core";

export default function Info() {
  const { disconnect } = useConnectors();
  const { address, isConnected } = useAccount();

  // Uses the Starknet.id contract by default, 
  // but a different contract can be specified
  // To do the reverse operation (get address from stark name)
  // you can use the useAddressFromStarkName hook
  const { data: starkName } = useStarkName({
    address: address || "",
  });  

  const truncated = `${address?.substring(0, 6)}...${address?.slice(-2)}`;

  if (!isConnected) {
    return null;
  }

  return (
    <>
      <div className="flex justify-end gap-8 align-baseline py-2 px-4">
        <p className="underline py-2 px-4">{starkName || truncated}</p>
        <button type="button" onClick={disconnect} className="font-bold border border-gray-500 py-2 px-4 rounded-lg transition-colors hover:bg-gray-600 hover:text-white">
          Disconnect
        </button>
      </div>
    </>
  );
}
