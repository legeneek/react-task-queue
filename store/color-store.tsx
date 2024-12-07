import { createContext, useContext, useReducer } from "react";

const ColorContext = createContext<any>(null);

const ColorDispatchContext = createContext<any>(null);

export function ColorProvider({ children }: any) {
  const [state, dispatch] = useReducer(reducer, {
    colors: [],
  });

  return (
    <ColorContext value={state}>
      <ColorDispatchContext value={dispatch}>{children}</ColorDispatchContext>
    </ColorContext>
  );
}

export function useColor() {
  return useContext(ColorContext);
}

export function useColorDispatch() {
  return useContext(ColorDispatchContext);
}

function reducer(
  state: { colors: any },
  action: {
    type: string;
    data: any;
  }
) {
  switch (action.type) {
    case "addColor": {
      return {
        colors: [...state.colors, action.data],
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
