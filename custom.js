function SendInputToUnity(value) {
    gameInstance.SendMessage('EnterWallet', 'SetWalletInput', value);
}
