import styled from 'styled-components';
import grey from '@material-ui/core/colors/grey';

const Tag = styled.li`
  display: inline-block;

  padding: 10px 20px;
  margin-right: 5px;
  margin-bottom: 10px;

  border-radius: 5px;

  cursor: pointer;
  
  background-color: ${grey[100]};
  &:hover {
    background-color: ${grey[300]};
  }
`;

export default Tag;
