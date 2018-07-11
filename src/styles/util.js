import { css } from 'styled-components';
import grey from '@material-ui/core/colors/grey';

const sizes = {
  desktop: 992,
  tablet: 800,
  phone: 376,
};

export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }
  `;

  return acc;
}, {});

export const shadow = () => (
  `
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.46);
  `
);

export const linkText = () => (`
  color: inherit;
  text-decoration: none;
  cursor: pointer;
`);

export const mainContainer = () => (`
  width: 95%;
  ${media.tablet`width: 80%;`}
  min-height: 800px;

  max-width: 1200px;
  margin: 1rem auto;
`);

export const emptyContainer = () => (`
  width: 100%;
  margin: 100px 0;

  text-align: center;
`);

export const listItem = () => (`
  margin: 10px 1px;

  border-radius: 5px;
  border: 1px solid #e0e0e0;
`);

export const defaultPadding = () => (`
  padding: 5px 14px;
`);

export const defaultTag = () => (`
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
`);
