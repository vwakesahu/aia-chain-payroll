import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const deployed = await deploy("PayRoll", {
    from: deployer,
    log: true,
  });

  console.log(`PayRoll contract deployed at: ${deployed.address}`);
  
};

export default func;
func.id = "deploy_confidentialERC20";
func.tags = ["ConfidentialToken"];
