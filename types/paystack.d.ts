interface PaystackPop {
  setup(options: {
    key: string;
    email: string;
    amount: number;
    ref: string;
    onClose?: () => void;
    callback?: (response: any) => void;
  }): {
    openIframe(): void;
  };
}

declare global {
  interface Window {
    PaystackPop: PaystackPop;
  }
}

export {};

