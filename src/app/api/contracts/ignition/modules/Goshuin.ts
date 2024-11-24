// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import dotenv from "dotenv";

dotenv.config();

const DEPLOYER_WALLET_ADDRESS = process.env.DEPLOYER_WALLET_ADDRESS ?? "";

const GoshuinModule = buildModule("GoshuinModule", (m) => {
	const initialOwner = m.getParameter("initialOwner", DEPLOYER_WALLET_ADDRESS);

	const goshuin = m.contract("Goshuin", [initialOwner]);

	return { goshuin };
});

export default GoshuinModule;
