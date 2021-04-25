import { Fragment } from 'react';
import { Divider, Flex, Button, Spacer, Box, Text } from '@chakra-ui/react';
import axios from 'axios';
import styled from '@emotion/styled';

const ListTodo = ({ todos, handleDeleteTodo, handleCompletedTodo }) => {
  const deleteTodo = async id => {
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`);
      handleDeleteTodo(id);
    } catch (err) {
      console.log(err.message);
    }
  };
  const todoIsComplete = async (id, complete) => {
    // console.log(e);
    const isComplete = complete ? 'false' : 'true';
    // console.log(id);
    try {
      await axios.put(`http://localhost:5000/todos/${id}`, {
        complete: isComplete,
      });
      handleCompletedTodo(id, complete);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Box minW={300}>
      {todos &&
        todos.map(item => {
          return (
            <Fragment key={item.todo_id}>
              <Flex mt={3}>
                {!item.complete ? (
                    <>
                  <P
                    onClick={() => todoIsComplete(item.todo_id, item.complete)}
                  >
                    {item.description}
                  </P>
                  <Spacer />
                  <Button
                    onClick={() => deleteTodo(item.todo_id)}
                    size="xs"
                    colorScheme="red"
                  >
                    Delete
                  </Button>
                  </>
                ) : (
                  <P
                    complete
                    color="gray"
                    as="s"
                    onClick={() => todoIsComplete(item.todo_id, item.complete)}
                  >
                    {item.description}
                  </P>
                )}
                
              </Flex>
              <Divider m={3} />
            </Fragment>
          );
        })}
    </Box>
  );
};

export default ListTodo;

const P = styled.p`
  color: ${props => (props.complete ? 'grey' : 'black')};
  text-decoration: ${props => (props.complete ? 'line-through' : 'none')};
  &:hover {
    cursor: pointer;
  }
`;


