import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
  margin-bottom: 20px;

  border: none;
  outline: none;

  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  font-size: ${props => props.fontSize || '3em'};
  line-height: 3em;
  background-color: inherit;
`;

export default Input;
