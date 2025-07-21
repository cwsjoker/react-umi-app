import { useEffect, useRef, useState } from "react";

type DragPros = {
  dragName?: string;
  defaultPosition?: {
    x: number;
    y: number;
  };
  children: React.ReactNode;
};

const Drag: React.FC<DragPros> = ({ dragName = '', defaultPosition = {x: 0, y:0}, children }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  
  const dragRefs = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const savedPositionStr = window.localStorage.getItem(`${dragName}_position`);
    if (savedPositionStr) {
      const savedPosition = JSON.parse(savedPositionStr);
      setPosition(savedPosition);
    } else {
      setPosition(defaultPosition)
    }
  }, []);

  // 鼠标按下事件
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    // 阻止默认事件，防止选中文本
    if (dragRefs.current) {
      dragRefs.current.style.cursor = 'move';
    }
    e.preventDefault();
    const offsetX = e.clientX - position.x;
    const offsetY = e.clientY - position.y;
    setOffset({ x: offsetX, y: offsetY });
  };

  // 鼠标移动事件
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragging) return;

    const _x = e.clientX - offset.x;
    const _y = e.clientY - offset.y
    
    if (_x < 10) {
      setPosition({
        x: 10,
        y: e.clientY - offset.y,
      });
    } else {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }


    console.log('setPosition', {
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    })
  };

  // 鼠标释放事件
  const onMouseUp = () => {
    setDragging(false);
    if (dragRefs.current) {
     dragRefs.current.style.cursor = '';
    }
    // 存储当前坐标
    if (dragName) {
      localStorage.setItem(`${dragName}_position`, JSON.stringify(position));
    }
  };

  return (
    <div
      ref={dragRefs}
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
      }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      {children}
    </div>
  );
};

export default Drag;
