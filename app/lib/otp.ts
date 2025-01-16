export const initialOtpState: OTPState = {
  input_1: "",
  input_2: "",
  input_3: "",
  input_4: "",
  input_5: "",
  input_6: "",
};

export const otpReducer = (
  state: OTPState,
  action: { type: string; payload: string }
): OTPState => {
  switch (action.type) {
    case "input_1":
    case "input_2":
    case "input_3":
    case "input_4":
    case "input_5":
    case "input_6":
      return {
        ...state,
        [action.type]: action.payload,
      };
    case "reset":
      return initialOtpState;
    default:
      return state;
  }
};
