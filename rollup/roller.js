async function CreateBundles() {
  const watch = process.env.WATCH;
  const folder = process.env.FOLDER;
  const ENV_NAME = process.env.ENV_NAME;
  const DelegateRollUp = require('./delegator.js');
  if (ENV_NAME === 'production' || !folder) {
    const componentsRoller = new DelegateRollUp('components');
    await componentsRoller.roll();
    const servicesRoller = new DelegateRollUp('services');
    await servicesRoller.roll();
    const themesRoller = new DelegateRollUp('themes');
    await themesRoller.roll();
    const utilsRoller = new DelegateRollUp('utils');
    await utilsRoller.roll();
    return;
  }
  const roller = new DelegateRollUp(folder);
  if (watch) {
    await roller.watch();
  } else {
    await roller.roll();
  }
}

CreateBundles();
