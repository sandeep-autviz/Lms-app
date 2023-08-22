// import React, { ComponentType, useEffect, useState } from "react";
// import NetInfo from "@react-native-community/netinfo";
// import NoInternetModal from "../modal/NoInternetModal";

// const withInternetCheck = <P extends object>(
//   WrappedComponent: ComponentType<P>
// ) => {
//   return (props: any) => {

//     if (!isConnected) {
//       return <NoInternetModal isConnected={isConnected} />;
//     }

//     return (
//       <>
//         <WrappedComponent {...props} isConnected={isConnected} />
//       </>
//     );
//   };
// };

// export default withInternetCheck;
