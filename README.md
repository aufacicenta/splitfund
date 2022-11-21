# Splitfund

**Sp/itfund is a co-ownership protocol built on NEAR.**

For the end user, Sp/itfund looks and feels like a Real Estate crowdfunding site: funding amount goal, days left, number of backers, etc. Sp/itfund makes it easy to invest in Real Estate co-ownership starting from 50.00 USDT/NEAR.

On the technical side, users get back a new NEP141 token as collateral for their USDT/NEAR investment. This collateral is tradable at any time. If the funding amount goal is not reached within the expiration date, the users get their investment back.

- Sp/itfund is decentralized, all of the information about the property is stored in the blockchain.
- Sp/itfund charges a 2% fee upon each USDT/NEAR investment, this fee is non-refundable and is used to keep the platform running.
- Sp/itfund manages the Real Estate assets to guarantee the properties' maintenance and profitability. Users can trust Sp/itfund as their investment manager with solid legal representatives in each jurisdiction.
- Sp/itfund makes it easy to make cross-country Real Estate investments. A user in Japan may co-own Real Estate in Mexico, for example.
- Sp/itfund opens a new market of tradable NEP141 Real Estate collateral tokens as a **store of value**.
- Once Sp/itfund buys a Real Estate property, our legal mechanism will make each investor's wallet a legal owner of the asset.

## NEAR Contracts

Find the contract code [here](https://github.com/aufacicenta/splitfund-contracts).

## Current features

[x] Create NEAR Escrow contracts from Strapi CMS data
[x] Use WalletSelector to connect a NEAR wallet
[x] Deposit an amount of USDT
[x] Display contract data in the property details page
[ ] Withdraw if property is not funded or has expired (complete in the contract side, not in the UI side)
[ ] Delegate funds if property is funded (complete in the contract side, not in the UI side)

## Contributing

Clone the project, make your edits and open a new pull-request. Make sure you follow Conventional Commits before pushing.

## License

MIT