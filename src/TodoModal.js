import React from "react";
import styled from "styled-components";
import { MdClear } from "react-icons/md";

const TodoModal = ({ setTodoModal }) => {
  const closeModal = () => {
    setTodoModal(false);
  };
  return (
    <TodoInsert>
      <QuitButton onClick={closeModal} />
      <TodoInsertWrapper>
        <TodoInsertTitle placeholder="할 일" />
        <TodoInsertBody placeholder="상세 내용" />
        <TodoInsertButton>제출하기</TodoInsertButton>
      </TodoInsertWrapper>
    </TodoInsert>
  );
};

export default TodoModal;

const TodoInsert = styled.div`
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 10000;
`;

const TodoInsertWrapper = styled.div`
  width: 500px;
  height: 500px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 6rem;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
`;

const TodoInsertTitle = styled.input`
  height: 100px;
  padding: 0 1rem;
`;

const TodoInsertBody = styled.textarea`
  height: 700px;
  padding: 1rem;
`;

const TodoInsertButton = styled.button`
  height: 100px;
  cursor: pointer;
  background-color: #36f;
  color: white;

  &:hover {
    background-color: #002b5b;
  }
`;

const QuitButton = styled(MdClear)`
  position: relative;
  font-size: 50px;
  left: 1360px;
  top: 10px;
  color: white;
  cursor: pointer;

  &:hover {
    color: #36f;
  }
`;
