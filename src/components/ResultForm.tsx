import { useAccount, useContractWrite } from "@starknet-react/core";
import { useMemo, useState } from "react";
import { stark, shortString } from "starknet";
import { truncate } from "../lib/utils";
import { RpcProvider } from "starknet";

const CONTRACT_ADDRESS =
  "0x061f0e716ca144db7e0d468e848f31d37027057fc5c4856eb4c9b4354736ee82";

export default function ResultForm() {
  const providerRPC = new RpcProvider({
    nodeUrl:
      "https://starknet-goerli.infura.io/v3/bbbf38dfeb1e4ee18bd728159d0b4e80",
  });

  const { address } = useAccount();

  const [overIndex, setOverIndex] = useState("");

  const [events, setEvents] = useState([]);
  const [isOver, setIsOver] = useState([]);

  async function a() {
    const lastBlock = await providerRPC.getBlock("latest");
    const eventsList = await providerRPC.getEvents({
      address: CONTRACT_ADDRESS,
      from_block: { block_number: 857652 },
      to_block: { block_number: lastBlock.block_number },
      chunk_size: 20,
    });

    setEvents(eventsList.events as never[]);

    console.log(events);
  }

  const calls = useMemo(() => {
    // compile the calldata to send
    const calldata = stark.compileCalldata({
      index: overIndex,
    });

    // return a single object for single transaction,
    // or an array of objects for multicall
    return {
      contractAddress: CONTRACT_ADDRESS,
      entrypoint: "overPublish",
      calldata,
    };
  }, [overIndex]);

  const { write } = useContractWrite({
    calls,
  });

  async function send(i: string) {
    setOverIndex(i);
    setIsOver([]);
    write();
  }

  return (
    <div>
      <button className="title text-4xl shadowed mb-8" onClick={a}>
        Recruiting Station
      </button>

      <h3 className="text-md font-bold flex flex-wrap justify-center">
        {events.map((event, index) => {
          if (isOver.includes(parseInt(event.keys[1], 16))) {
            return null;
          }
          return (
            <div
              key={index}
              className="my-2 px-6 py-6 bg-offblack border box-shadow text-center"
            >
              <div>
                <p>brief: </p>
                <p>{shortString.decodeShortString(event.keys[3])}</p>
              </div>
              <div className="my-4">
                <p>twitter: </p>
                <a
                  href={`https://twitter.com/${shortString.decodeShortString(
                    event.keys[4]
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  {shortString.decodeShortString(event.keys[4])} ↗
                </a>
              </div>
              <div>
                <p>publisher: </p>
                <a
                  href={`https://goerli.voyager.online/contract/${event.keys[2]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  {truncate(event.keys[2])} ↗
                </a>
              </div>
              {address === event.keys[2] ? (
                <button className="mt-4" onClick={() => send(event.keys[1])}>
                  cancel
                </button>
              ) : null}
            </div>
          );
        })}
      </h3>
    </div>
  );
}

[
  {
    block_hash:
      "0x79a15d3adf9dfc60241734a5c216d77eecdd7768bba7e6c3c5dfb97df720d78",
    block_number: 850599,
    data: [],
    from_address:
      "0x61f0e716ca144db7e0d468e848f31d37027057fc5c4856eb4c9b4354736ee82",
    keys: [
      "0x385775c725d7aad6230ea310a07bd4a05f559c13e9251106eeac687719a94a",
      "0x1",
      "0x55a249b070857fed43b8a19a30851b36ae1fd51c52dd8386040c0d824679bca",
      "0x64656669",
      "0x74656c656d61736b",
    ],
    transaction_hash:
      "0x587cbfdff763e6f28558033086e982bef167261aa9bc50791067be1f1f63e3d",
  },
  {
    block_hash:
      "0x114e010403edd5dafd38a7ecdda710fc99f347593be1244eac0ea4d00012af9",
    block_number: 857212,
    data: [],
    from_address:
      "0x61f0e716ca144db7e0d468e848f31d37027057fc5c4856eb4c9b4354736ee82",
    keys: [
      "0x385775c725d7aad6230ea310a07bd4a05f559c13e9251106eeac687719a94a",
      "0x2",
      "0x55a249b070857fed43b8a19a30851b36ae1fd51c52dd8386040c0d824679bca",
      "0x7277612077697468207a6b206f6e20737461726b6e6574",
      "0x747769747465723a7979637a",
    ],
    transaction_hash:
      "0x7c3a3c808cba90fc501329ca7c7e0304da0de3d7062f1547e00650ab4d0863f",
  },
];
