async function CreateBundles() {
  const DelegateRollUp = require('./delegator.js');
  const componentsRoller = new DelegateRollUp('components');
  await componentsRoller.roll();
  const servicesRoller = new DelegateRollUp('services');
  await servicesRoller.roll();
  const utilsRoller = new DelegateRollUp('utils');
  await utilsRoller.roll();
  const themesRoller = new DelegateRollUp('themes');
  await themesRoller.roll();
}

CreateBundles();
