import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcEmptyTrash } from "react-icons/fc";
import styled from "styled-components";
import TodoInsertModal from "./TodoInsertModal";
import TodoModal from "./TodoModal";

const Todo = () => {
  const [todoInsertModal, setTodoInsertModal] = useState(false);
  const [todoModal, setTodoModal] = useState(false);
  const [todoData, setTodoData] = useState([]);
  const navigate = useNavigate();
  const activeInsertModal = () => {
    setTodoInsertModal(true);
  };

  const activeTodoModal = () => {
    setTodoModal(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      const isSignIn = localStorage.getItem("token");
      try {
        await axios
          .get("http://localhost:8080/todos", {
            headers: {
              Authorization: isSignIn,
            },
          })
          .then(res => {
            if (res.status === 200) {
              setTodoData(res.data.data);
            }
          });
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [todoInsertModal]);

  const deleteTodo = useCallback(
    async e => {
      e.preventDefault();
      const isSignIn = localStorage.getItem("token");
      try {
        await axios
          .delete(`http://localhost:8080/todos/${e.target.id}`, {
            headers: {
              Authorization: isSignIn,
            },
          })
          .then(res => {
            if (res.status === 200) {
              setTodoData(res.data.data);
              navigate("/");
            }
          });
      } catch (err) {
        console.error(err);
      }
    },
    [navigate]
  );

  const logOut = useCallback(
    e => {
      e.preventDefault();
      localStorage.removeItem("token");
      navigate("/auth");
    },
    [navigate]
  );

  return (
    <TodoWrapper>
      <TodoUserInfo>
        <span>님 환영합니다!</span>
        <LogOutButton onClick={logOut}>로그아웃</LogOutButton>
      </TodoUserInfo>
      <TodoListBody>
        <TodoListTitle>
          ToDo List
          <TodoButtonWrapper>
            <InsertButton onClick={activeInsertModal}>추가</InsertButton>
          </TodoButtonWrapper>
        </TodoListTitle>
        {todoInsertModal ? (
          <TodoInsertModal setTodoInsertModal={setTodoInsertModal} />
        ) : (
          ""
        )}
        {todoModal ? <TodoModal setTodoModal={setTodoModal} /> : ""}
        <TodoListContent>
          {todoData.map(data => {
            return (
              <TodoListOne key={data.id}>
                <TodoTitle onClick={activeTodoModal}>{data.title}</TodoTitle>
                <DeleteTodo onClick={deleteTodo} id={data.id} />
              </TodoListOne>
            );
          })}
        </TodoListContent>
      </TodoListBody>
    </TodoWrapper>
  );
};

export default Todo;

const TodoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const TodoUserInfo = styled.div`
  padding: 1rem 0;
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid #e1e2e3;
`;

const LogOutButton = styled.button`
  width: 100px;
  height: 40px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #36f;
  color: white;

  &:hover {
    background-color: #002b5b;
  }
`;

const TodoListBody = styled.div`
  height: 80%;
`;

const TodoListTitle = styled.div`
  position: relative;
  width: 810px;
  height: 4rem;
  background: #22b8cf;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-left: auto;
  margin-right: auto;
  margin-top: 6rem;
  border-radius: 4px;
  overflow: hidden;
`;

const TodoButtonWrapper = styled.div`
  width: 810px;
  height: 2rem;
  position: absolute;
  left: 710px;
  top: 0px;
`;

const InsertButton = styled.button`
  width: 100px;
  height: 4rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #36f;
  color: white;

  &:hover {
    background-color: #002b5b;
  }
`;

const TodoListContent = styled.div`
  width: 810px;
`;

const TodoListOne = styled.div`
  width: 810px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #e1e2e3;
  border-radius: 5px;
`;

const DeleteTodo = styled(FcEmptyTrash)`
  height: 35px;
  width: 35px;
  cursor: pointer;
`;

const TodoTitle = styled.span`
  font-weight: bold;
  cursor: pointer;
  margin-left: 15px;

  &:hover {
    border-bottom: 1px solid black;
  }
`;
