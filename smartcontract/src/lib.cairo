#[starknet::contract]
mod recruitment {
    use starknet::ContractAddress;
    use starknet::get_caller_address;
    use array::ArrayTrait;
    use option::OptionTrait;

    #[storage]
    struct Storage {
        notion_index: u128,
        index_publisher: LegacyMap::<u128, ContractAddress>,
        is_index_over: LegacyMap::<u128, bool>,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        NotionDetail: NotionDetail, 
    }

    #[derive(Drop, starknet::Event)]
    struct NotionDetail {
        #[key]
        index: u128,
        #[key]
        publisher: ContractAddress,
        #[key]
        brief: felt252,
        #[key]
        contact: felt252,
    }


    #[external(v0)]
    fn get_notion_index(self: @ContractState) -> u128 {
        self.notion_index.read()
    }

    #[external(v0)]
    fn get_index_publisher(self: @ContractState, index: u128) -> ContractAddress {
        self.index_publisher.read(index)
    }

    #[external(v0)]
    fn get_is_index_over(self: @ContractState, index: u128) -> bool {
        self.is_index_over.read(index)
    }


    #[external(v0)]
    fn publish(ref self: ContractState, brief: felt252, contact: felt252) {
        let msgsender: ContractAddress = get_caller_address();

        self.notion_index.write(self.notion_index.read() + 1_u128);

        let index = self.notion_index.read();

        self.index_publisher.write(index, msgsender);

        self
            .emit(
                Event::NotionDetail(
                    NotionDetail {
                        index: index, publisher: msgsender, brief: brief, contact: contact, 
                    }
                )
            )
    }


    #[external(v0)]
    fn overPublish(ref self: ContractState, index: u128) {
        let msgsender: ContractAddress = get_caller_address();
        let publisher: ContractAddress = self.index_publisher.read(index);

        assert(msgsender == publisher, 'msgsender is not publisher');
        self.is_index_over.write(index, true);
    }
}
