import React, { Component } from 'react';
/*
메소드 정리
handleRemove: 삭제버튼이 onClick되면 현재 컴포넌트의 handleRemove에서 부모의 onRemove로 해당 행의 brdno를 전달한다.
handleSelectRow: 게시글이 선택되면(onClick되면) 현재 컴포넌트의 handleSelectRow에서 부모의 onSelectRow로 해당 행의 내용(row)를 전달한다.

*/

class BoardRow extends Component {
    //게시판 삭제
    handleRemove = () => {
        const { row, onRemove } = this.props;
        onRemove(row.brdno);
    }    
    //게시판 글 선택
    handleSelectRow = () => {
        const { row, onSelectRow } = this.props;
        onSelectRow(row);
    }    
    
    render() {
        return(
            <tr>
                <td>{this.props.row.brdno}</td>
                <td><a onClick={this.handleSelectRow}>{this.props.row.brdtitle}</a></td>
                <td>{this.props.row.brdwriter}</td>
                <td>{this.props.row.brddate.toLocaleDateString('ko-KR')}</td>
                <td><button onClick={this.handleRemove}>X</button></td>
            </tr>
        );
    }
}

export default BoardRow;

