import { useEffect, useState } from "react";
import { modalService, type ModalState } from "../services/modal.service";

export function useModalState(): ModalState {
  const [state, setState] = useState<ModalState>(modalService.getState());

  useEffect(() => {
    const unsubscribe = modalService.subscribe(setState);
    return unsubscribe;
  }, []);

  return state;
}
