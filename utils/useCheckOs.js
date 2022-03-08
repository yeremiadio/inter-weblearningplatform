import { useEffect, useState } from "react";

const useCheckOs = () => {
  const [isMobile, setMobile] = useState(false);
  useEffect(() => {
    const ac = new AbortController();
    const checkMobileOs = () => {
      if (/Android|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    };
    checkMobileOs();
    return () => {
      ac.abort();
    };
  }, []);

  return isMobile;
};

export default useCheckOs;
