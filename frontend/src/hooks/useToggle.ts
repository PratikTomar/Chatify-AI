import { useState } from "react";

const useToggle = () => {
  const [isToggle, setIsToggle] = useState(false);

  const toggleHandler = () => {
    setIsToggle((prev) => !prev);
  };

  return { toggleHandler, isToggle, setIsToggle };
};

export default useToggle;
