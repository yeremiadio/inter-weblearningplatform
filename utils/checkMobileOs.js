const checkMobileOs = () => {
  let isMobile = false; //initiate as false
  if (
    /Android|iPhone|iPad|iPod|BlackBerry/i.test(
      navigator.userAgent
    )
  ) {
    isMobile = true;
  } else {
    isMobile = false;
  }

  return isMobile;
};

export default checkMobileOs;
