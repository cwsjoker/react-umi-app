import type { XYCoord } from "react-dnd";
import { useDrop } from "react-dnd";
import DragItem from "./dragItem";

interface DragItem {
  id: string;
  type: string;
}

const IndexPage = () => {
  const [, drop] = useDrop(() => ({
    accept: "BOX",
    drop: (item: DragItem, monitor) => {
      console.log('item', item)
      const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;
      const left = Math.round(delta.x);
      const top = Math.round(delta.y);
      // 回传给drag
      
      console.log('left', left)
      console.log('top', top)

      return { top, left };
    },
  }));

  return (

      <div ref={drop} className=" fixed size-full">
        <DragItem id="a" type="BOX" initPosition={{
          left: 200,
          top: 200
        }}>
          <div className="w-80 h-80 bg-[skyblue]"></div>
        </DragItem>

        <DragItem id="b" type="BOX">
          <div className="w-50 h-50 bg-[skyblue]"></div>
        </DragItem>
      </div>


  );
};

export default IndexPage;
