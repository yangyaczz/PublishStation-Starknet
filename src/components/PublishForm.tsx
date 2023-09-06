import {
  useContractWrite,
} from "@starknet-react/core";
import { FormEvent, useMemo, useState } from "react";
import {  stark, shortString } from "starknet";
import { truncate } from "../lib/utils";


const CONTRACT_ADDRESS =
  "0x061f0e716ca144db7e0d468e848f31d37027057fc5c4856eb4c9b4354736ee82";

export default function PublishForm() {

  const [brief, setBrief] = useState("");
  const [contact, setContact] = useState("");

  const calls = useMemo(() => {
    if (!brief || !contact) return;


    // compile the calldata to send
    const calldata = stark.compileCalldata({
      brief: shortString.encodeShortString(brief),
      contact: shortString.encodeShortString(contact),
    });

    // return a single object for single transaction,
    // or an array of objects for multicall
    return {
      contractAddress: CONTRACT_ADDRESS,
      entrypoint: "publish",
      calldata,
    };
  }, [brief, contact]);

  const { write, isLoading, data } = useContractWrite({
    calls,
  });

  async function send(event: FormEvent) {
    event.preventDefault();
    write();
  }

  return (
    <div className=" my-8 px-8 py-6 bg-offblack border border-offwhite box-shadow text-center max-w-[600px] mx-auto">
      <strong>Fill in your information to recruit your team members</strong>
      <h3 className="text-md font-bold">
        smart contract:{" "}
        <a
          href="https://goerli.voyager.online/contract/0x061f0e716ca144db7e0d468e848f31d37027057fc5c4856eb4c9b4354736ee82"
          target="_blank"
          referrerPolicy="no-referrer"
          className="underline"
        >
          {truncate(CONTRACT_ADDRESS)} ↗
        </a>
      </h3>
      <form onSubmit={send} className="flex flex-col gap-4 my-4">
        <input
          type="text"
          name="brief"
          maxLength={30}
          placeholder="Your Project Brief"
          required
          onChange={(e) => setBrief(e.target.value)}
        />
        <input
          type="text"
          name="contact"
          maxLength={30}
          placeholder="Your Contact Info(Twitter)"
          required
          onChange={(e) => setContact(e.target.value)}
        />
        <button type="submit" className="btn hover:border-offwhite">
          Publish
        </button>
      </form>
      <h1>
        {isLoading && <p>tx pending...</p>}
        {data && (
          <div>
            <p>Transaction Hash: </p>
            <a
              href={`https://goerli.voyager.online/tx/${data.transaction_hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {truncate(data.transaction_hash)} ↗
            </a>
          </div>
        )}
      </h1>
    </div>
  );
}
