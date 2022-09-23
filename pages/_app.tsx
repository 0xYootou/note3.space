import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "@self.id/framework";
import "antd/dist/antd.css";

const aliases = {
  definitions: {
    myNotes: "kjzl6cwe1jw149lczaa6b60j55phdt8y77pjd29wilfercijywj1g41cenx2ajk",
    basicProfile:
      "kjzl6cwe1jw145cjbeko9kil8g9bxszjhyde21ob8epxuxkaon1izyqsu8wgcic",
    cryptoAccounts:
      "kjzl6cwe1jw149z4rvwzi56mjjukafta30kojzktd9dsrgqdgz4wlnceu59f95f",
    alsoKnownAs:
      "kjzl6cwe1jw146zfmqa10a5x1vry6au3t362p44uttz4l0k4hi88o41zplhmxnf",
  },
  schemas: {
    Note3:
      "ceramic://k3y52l7qbv1fryixb0qent6feetgpo061ywb6tb49njprdj1ycijafxscdgppdv5s",
    Note3s:
      "ceramic://k3y52l7qbv1frxsnlhn49un0qwgtd0qeaajll3d37de5x2dm7121huc5ek88ntbeo",
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
