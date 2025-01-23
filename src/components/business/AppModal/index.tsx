import { lazy, Suspense, useMemo } from "react";
import modalModel from '@/store/models/modal.model'
import { useModel } from 'foca'

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
  const modalQueue = useModel(modalModel, state => state.modalQueue)
  console.log('modalQueue', modalQueue)

  const modals = useMemo(() => {
    return NModalTypes.map((item) => {
      const showModal = modalQueue.includes(item.type)
      const props = showModal ? {
        opened: true,
        onClose() {
          console.log('close')
          modalModel.closeModal({type: item.type})
        }
      } : {
        opened: false,
        onClose() {}
      }

      return {
        ...item,
        ...props
      };
    })
  }, [modalQueue]);

  return (
    <>
      {modals.map(({ type, Comp, ...props }) => {
        return <Comp key={type} {...props}></Comp>;
      })}
    </>
  );
};

export default AppModal;
