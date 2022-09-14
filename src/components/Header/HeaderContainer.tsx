import React, { useEffect } from "react";
import { requestUpdate, useAppDispatch } from "../../store";
import HeaderView from "./HeaderView";

const HeaderContainer = () => {
  const dispatch = useAppDispatch();

  const intervalRef = React.useRef<null | NodeJS.Timeout>(null);

  const resetIntervalRef = () => {
    intervalRef.current = setInterval(() => {
      dispatch(requestUpdate());
    }, 30000);
  };

  useEffect(() => {
    dispatch(requestUpdate());

    resetIntervalRef();

    return () => {
      return clearInterval(intervalRef.current as NodeJS.Timeout);
    };
  }, []);

  const refreshHandler = () => {
    dispatch(requestUpdate());
    resetIntervalRef();
  };

  return <HeaderView refreshHandler={refreshHandler} />;
};

export default HeaderContainer;
