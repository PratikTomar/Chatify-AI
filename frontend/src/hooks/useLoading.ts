import { useState } from "react";

const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false);

  const loadingHandler = () => {
    setIsLoading((prev) => !prev);
  };

  return { isLoading, loadingHandler };
};

export default useLoading;
