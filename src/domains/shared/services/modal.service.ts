export type ModalView =
  | "shopping-list"
  | "category"
  | "group"
  | "shopping-item";

export interface ModalStateEntry {
  view: ModalView;
  payload?: unknown;
}

export interface ModalState {
  isOpen: boolean;
  stack: ModalStateEntry[];
  view?: ModalView;
  payload?: unknown;
}

type ModalListener = (state: ModalState) => void;

class ModalService {
  private listeners = new Set<ModalListener>();
  private state: ModalState = { isOpen: false, stack: [] };

  getState() {
    return this.state;
  }

  subscribe(listener: ModalListener) {
    this.listeners.add(listener);

    listener(this.state);

    return () => {
      this.listeners.delete(listener);
    };
  }

  open(view: ModalView, payload?: unknown) {
    const stack = [...this.state.stack, { view, payload }];

    this.state = {
      isOpen: true,
      stack,
      view,
      payload,
    };

    this.emit();
  }

  close(index = this.state.stack.length - 1) {
    if (!this.state.isOpen || index < 0) {
      return;
    }

    const stack = this.state.stack.slice(0, index);

    if (stack.length === 0) {
      this.state = { isOpen: false, stack: [] };
    } else {
      const top = stack[stack.length - 1];
      this.state = {
        isOpen: true,
        stack,
        view: top.view,
        payload: top.payload,
      };
    }

    this.emit();
  }

  closeAll() {
    if (!this.state.isOpen) {
      return;
    }

    this.state = { isOpen: false, stack: [] };
    this.emit();
  }

  private emit() {
    for (const listener of this.listeners) {
      listener(this.state);
    }
  }
}

export const modalService = new ModalService();
