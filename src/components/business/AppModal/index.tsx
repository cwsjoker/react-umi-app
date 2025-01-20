import { lazy, Suspense, useMemo } from "react";

const NModalTypes = [
  {
    type: "CommonModal",
    Comp: lazy(() => import("./CommonModal")),
  },
  {
    type: "RechargeModal",
    Comp: lazy(() => import("./RechargeModal")),
  },
].map((item) => {
  return {
    ...item,
    Comp: (props: React.ComponentProps<typeof item.Comp>) => <Suspense fallback={null}>{<item.Comp {...props}></item.Comp>}</Suspense>,
  };
});


const AppModal = () => {
  
  
  const modals = useMemo(() => {
    return NModalTypes.map((item) => {
      return {
        ...item,
        opened: false,
        onClose() {
          console.log('close')
        }
      };
    })
  }, []);

  return (
    <>
      {modals.map(({ type, Comp, ...props }) => {
        return <Comp key={type} {...props}></Comp>;
      })}
    </>
  );
};

export default AppModal;
