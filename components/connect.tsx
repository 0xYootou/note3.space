import { EthereumAuthProvider, useViewerConnection } from "@self.id/framework";

export function ConnectButton() {
  const [connection, connect, disconnect] = useViewerConnection();

  return connection.status === "connected" ? (
    <button
      onClick={() => {
        disconnect();
      }}
    >
      Disconnect ({connection.selfID.id})
    </button>
  ) : (
    <button
      disabled={connection.status === "connecting"}
      onClick={async () => {
        //@ts-ignore
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        //@ts-ignore
        await connect(new EthereumAuthProvider(window.ethereum, accounts[0]));
      }}
    >
      Connect
    </button>
  );
}
