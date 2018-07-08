import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
  margin-bottom: 10px;
  padding: 5px 0px;

  border: none;
  outline: none;

  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  font-size: ${props => props.fontSize || '3em'};
  line-height: ${props => props.lineHeight || '3em'};
  background-color: inherit;

  &:focus {
    border-bottom: 1px solid black;
  }
`;

export default Input;
