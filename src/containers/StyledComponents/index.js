import styled from "styled-components";

export const CellWrapper = styled.div`
	min-height: ${props => props.isHeader ? 24 : 80}px;
	min-width: ${props => props.isADS ? 0 : 120}px;
	background-color: #fff;
	color: ${props => props.isSelectedMonth ? '#124072' : '#ccc'};
  text-align: center;
  font-weight: 600;
  &:nth-child(7) {
    // color: red;
  }
`;

export const CellWrapperADS = styled.div`
	min-height: 45px;
	background-color: #fff;
	color: ${props => props.isSelectedMonth ? '#124072' : '#ccc'};
  text-align: center;
  font-weight: 600;
  line-height: 45px;
  &:nth-child(7) {
    // color: red;
  }
`;

export const RowInCell = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: ${props => props.justifyContent ? props.justifyContent : 'flex-start'};
	${props => props.pr && `padding-right: ${props.pr * 8}px`}
  // &:nth-child(2) {
  //   background-color: red;
  // }
}
`;

export const EventListWrapper = styled('ul')`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const EventListItemWrapper = styled('li')`
	padding-left: 2px;
	padding-right: 2px;
	margin-bottom: 2px;
	display: flex;
`;

export const EventItemWrapper = styled('button')`
	position: relative;
	flex-grow: 1;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	width: 114px;
	border: unset;
	color: #DDDDDD;
	cursor: pointer;
	margin: 0;
	padding: 0;
	text-align: left;
	background-color: #5d5f63;
	border: 1px solid #5d5f63;
	border-radius: 2px;
`;

export const EventTitle = styled('input')`
  padding: 8px 14px;
  font-size: .85rem;
  width: 100%;
  border: unset;
  background-color: #fff;
  color: #DDDDDD;
  outline: unset;
  border-bottom: 1px solid #464648;
`;

export const EventBody = styled('textarea')`
  padding: 8px 14px;
  font-size: .85rem;
  width: 100%;
  border: unset;
  background-color: #fff;
  color: #DDDDDD;
  outline: unset;
  border-bottom: 1px solid #464648;
  resize: none;
  height: 60px;
`;

export const ButtonsWrapper = styled('div')`
  padding: 8px 14px;
  display: flex;
  justify-content: flex-end;
`;

export const ButtonWrapper = styled('button')`
  color: ${props => props.danger ? '#f00' : '#27282A'};
  border: 1px solid ${props => props.danger ? '#f00' : '#27282A'};
  border-radius: 2px;
  cursor: pointer;
  &:not(:last-child){
    margin-right: 2px;
  }
`;