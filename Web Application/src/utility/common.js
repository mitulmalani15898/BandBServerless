import Cookies from "js-cookie";

export const isLoggedIn = () => {
  return (
    !!Cookies.get("accessToken") &&
    !!Cookies.get("idToken") &&
    !!Cookies.get("refreshToken")
  );
};

/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 */
export const generateCeasarCipherKey = (min = 1, max = 26) => {
  // The maximum is inclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min + 1) + min);
};
