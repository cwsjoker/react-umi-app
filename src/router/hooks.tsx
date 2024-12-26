import {
  NavigateOptions,
  To,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAppData } from "umi";

export const useAuthNavigate = () => {
  const n = useNavigate();
  // const routes = useAppData().clientRoutes;
  // const location = useLocation();

  const result = (to: To | number, options?: NavigateOptions) => {
    console.log('to:', to)
    if (typeof to !== "number") {
      // const toPath = typeof to === "object" ? to.pathname : to?.split("?")?.[0];
      return n(to, options);
    }
    return n(to);
  };

  return result as typeof n;
};
