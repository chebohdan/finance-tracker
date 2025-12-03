import { useState } from "react";

function useModalForm() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return { isOpen, setIsOpen };
}

export default useModalForm;
