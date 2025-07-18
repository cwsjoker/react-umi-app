import { useEffect, useState } from "react";
import { useDrag } from "react-dnd";

type ItemProps = {
  id: string;
  type: string;
  children?: React.ReactNode;
  initPosition?: {
    left: number;
    top: number;
  }
};

const DragItem: React.FC<ItemProps> = ({ id, type, children, initPosition, ...props }) => {


  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [{ isDragging }, drag] = useDrag(() => ({
    type,
    item: { id },
    end(item, monitor) {
      let top = 0,
        left = 0;
      if (monitor.didDrop()) {
        const dropRes = monitor.getDropResult() as any; //获取拖拽对象所处容器的数据，获取坐标变化
        if (dropRes) {
          top = dropRes.top;
          left = dropRes.left;
        } //这里必须写成函数的传入方式，否则无法获取上一个state
        setOffsetX((offsetX) => offsetX + left);
        setOffsetY((offsetY) => offsetY + top);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));


  useEffect(() => {
    if (initPosition) {
      setOffsetX(initPosition.left);
      setOffsetY(initPosition.top);
    }
  }, [])

  return (
    <>
      {
        !isDragging && (
          <div
            ref={drag}
            style={{
              cursor: "move",
              position: "absolute",
              left: offsetX,
              top: offsetY,
            }}
          >
            {children}
          </div>
        )
      }
    </>
    
  );
};

export default DragItem;
