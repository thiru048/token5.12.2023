// import  { Fragment, useEffect } from "react";
// import { watchAccount } from "@wagmi/core";
// import { watchNetwork ,use} from '@wagmi/core'
// import {  useNetwork, useSwitchNetwork,useDisconnect } from 'wagmi'


// export  function WatchAcc() {
//   const { disconnect } = useDisconnect()
//   const { chain } = useNetwork()

//   const networkSwitchDisconnect = () => {
//     localStorage.clear()
//     disconnect()
//   }

//   console.log("in watch js")

//   // const unwatchNet =  watchNetwork((network) => console.log("connected to chain",network))
//   // const unwatch = watchAccount((account) => 
//   // console.log("this is current account connected",account));
//   return <Fragment />
// }
// export default WatchAcc;

import React, { Fragment, useEffect } from "react";
import { watchAccount, watchNetwork } from "@wagmi/core";
import { useDisconnect, useNetwork } from "wagmi";

export function WatchAcc() {
  const { disconnect } = useDisconnect();
  const { chain } = useNetwork();

  const networkSwitchDisconnect = () => {
    // localStorage.clear(); ****
    // disconnect(); ****
  };

  useEffect(() => {
    const unwatchNet = watchNetwork((network) =>
      console.log("connected to chain", network)
    );

    const unwatch = watchAccount((account) =>
      console.log("this is current account connected", account)
    );

    return () => {
      unwatch();
      unwatchNet();
    };
  }, []);

  return <Fragment />;
}

export default WatchAcc;
