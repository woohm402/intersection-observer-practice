import styled from "styled-components";

export const List = styled.ul`
  height: 500px;
  border: 1px solid black;
  overflow-y: scroll;
  margin: 100px;
  padding: 40px;
`;

export const ListItem = styled.li`
  height: 100px;
  border: 1px solid blue;
  display: flex;
  justify-content: space-between;
  padding: 0 100px;
  align-items: center;
`;
