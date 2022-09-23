import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "@self.id/framework";
import "antd/dist/antd.css";

const aliases = {
  definitions: {
    myNotes: "kjzl6cwe1jw147dufed540cxiw2favehmenrl52ae7stdqgbsp2nhtrbzb7celb",
    basicProfile:
      "kjzl6cwe1jw145cjbeko9kil8g9bxszjhyde21ob8epxuxkaon1izyqsu8wgcic",
    cryptoAccounts:
      "kjzl6cwe1jw149z4rvwzi56mjjukafta30kojzktd9dsrgqdgz4wlnceu59f95f",
    alsoKnownAs:
      "kjzl6cwe1jw146zfmqa10a5x1vry6au3t362p44uttz4l0k4hi88o41zplhmxnf",
  },
  schemas: {
    Note3:
      "ceramic://k3y52l7qbv1frxvoei5es7z4dj3z7x440i4wkpxhk36l2yujpmcwpxxc2twandbeo",
    Note3s:
      "ceramic://k3y52l7qbv1fry9v22ltzwrnlgavf85sdyi9kmt3hvnljakoecakrzs57f22xat4w",
    BasicProfile:
      "ceramic://k3y52l7qbv1frxt706gqfzmq6cbqdkptzk8uudaryhlkf6ly9vx21hqu4r6k1jqio",
    CryptoAccounts:
      "ceramic://k3y52l7qbv1frypussjburqg4fykyyycfu0p9znc75lv2t5cg4xaslhagkd7h7mkg",
    AlsoKnownAs:
      "ceramic://k3y52l7qbv1fryojt8n8cw2k04p9wp67ly59iwqs65dejso566fij5wsdrb871yio",
  },
  tiles: {},
};
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider client={{ ceramic: "testnet-clay", aliases: aliases }}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
