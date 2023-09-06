export default [
  {
    type: "function",
    name: "get_notion_index",
    inputs: [],
    outputs: [{ type: "core::integer::u128" }],
    state_mutability: "view",
  },
  {
    type: "function",
    name: "get_index_publisher",
    inputs: [{ name: "index", type: "core::integer::u128" }],
    outputs: [{ type: "core::starknet::contract_address::ContractAddress" }],
    state_mutability: "view",
  },
  {
    type: "enum",
    name: "core::bool",
    variants: [
      { name: "False", type: "()" },
      { name: "True", type: "()" },
    ],
  },
  {
    type: "function",
    name: "get_is_index_over",
    inputs: [{ name: "index", type: "core::integer::u128" }],
    outputs: [{ type: "core::bool" }],
    state_mutability: "view",
  },
  {
    type: "function",
    name: "publish",
    inputs: [
      { name: "brief", type: "core::felt252" },
      { name: "contact", type: "core::felt252" },
    ],
    outputs: [],
    state_mutability: "external",
  },
  {
    type: "function",
    name: "overPublish",
    inputs: [{ name: "index", type: "core::integer::u128" }],
    outputs: [],
    state_mutability: "external",
  },
  {
    type: "event",
    name: "contracts::recruitment::NotionDetail",
    kind: "struct",
    members: [
      { name: "index", type: "core::integer::u128", kind: "key" },
      {
        name: "publisher",
        type: "core::starknet::contract_address::ContractAddress",
        kind: "key",
      },
      { name: "brief", type: "core::felt252", kind: "key" },
      { name: "contact", type: "core::felt252", kind: "key" },
    ],
  },
  {
    type: "event",
    name: "contracts::recruitment::Event",
    kind: "enum",
    variants: [
      {
        name: "NotionDetail",
        type: "contracts::recruitment::NotionDetail",
        kind: "nested",
      },
    ],
  },
];
