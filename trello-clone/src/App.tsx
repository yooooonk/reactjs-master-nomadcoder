import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
`;

const Board = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.theme.cardColor};
`;
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
