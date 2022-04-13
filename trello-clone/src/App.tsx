import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function App() {
  const onDragEnd = () => {};
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <Droppable droppableId={"one"}>
          {(magic) => (
            <ul ref={magic.innerRef} {...magic.droppableProps}>
              <Draggable draggableId={"1"} index={0}>
                {(provide) => (
                  <li ref={provide.innerRef} {...provide.draggableProps}>
                    <span {...provide.dragHandleProps}>🔥</span>
                    11
                  </li>
                )}
              </Draggable>
              <Draggable draggableId={"2"} index={1}>
                {(provide) => (
                  <li ref={provide.innerRef} {...provide.draggableProps}>
                    <span {...provide.dragHandleProps}>🔥</span>
                    22
                  </li>
                )}
              </Draggable>
            </ul>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default App;
