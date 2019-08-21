import React, { Component } from 'react';
import BoardForm from './BoardForm';
import BoardItem from './BoardItem';

/*
state
maxNo: 글 인덱스 (기본 글 2개를 제외한 최소3부터 생성 시 마다 1씩 값이 증가.)
boards: 글 게시판을 나타내는 배열
selectedBoard: 게시판 글의 행이 선택되면 state변수인 selectedBoard에 행의 값이 모두 저장되고,
                BoardForm 컴포넌트에 selectedBoard의 값을 전달한다.
*/
/*
메소드 정리
handleSaveData: BoardForm의 handleSubmit에서 받은 data에 brdno가 있으면 글 수정이므로, data의 brdno와 같은 row의 data에 저장하고,
                                                data에 brdno가 없으면 글 삽입이므로, 글 게시판 배열(boards)에 concat으로 배열을 추가한다.
                그리고 selectedBoard값을 {}로 setState한다.
handleRemove: BoardItem에서 받은 brdno를 제외한 (filter) 글 게시판 배열(boards)가 화면에 렌더링된다.
handleSelectRow: BoardItem에서 행이 선택되면, 현재 컴포넌트의 selectedBoard에 행의 값이 모두 저장되고, BoardForm 컴포넌트에 selectedBoard의 값을 전달한다.
                 행이 선택되지 않으면, BoardForm에 {} 처럼 ''을 전달한다.


*/

class Board extends Component {

    state = {
        maxNo: 3,
        boards: [
            {
                brdno: 1,
                brdwriter: '신가은',
                brdtitle: '나는 킹갓가은이지.',
                brddate: new Date()
            },
            {
                brdno: 2,
                brdwriter: '김성종',
                brdtitle: '성종이는 멍청이야.',
                brddate: new Date()
            }
        ],
         selectedBoard:{}
    }
    
    handleSaveData = (data) => {
        if (!data.brdno) {            // new : Insert
            this.setState({
                maxNo: this.state.maxNo+1,
                boards: this.state.boards.concat({brdno: this.state.maxNo, brddate: new Date(), ...data }),
                selectedBoard: {}
            });
        } else {                                                        // Update
            this.setState({
                boards: this.state.boards.map(row => data.brdno === row.brdno ? {...data }: row),
                selectedBoard: {}
            })            
        }
    }
    
    handleRemove = (brdno) => {
        this.setState({
            boards: this.state.boards.filter(row => row.brdno !== brdno)
        })
    }
    
    //게시판 글의 행이 선택되면 state변수인 selectedBoard에 행의 값이 모두 저장된다.
    //BoardForm 컴포넌트에 selectedBoard의 값을 전달한다.
    handleSelectRow = (row) => {
        this.setState({selectedBoard:row});
    }
    

    //boards (게시판테이블)을 렌더링.
    render() {
        const { boards, selectedBoard } = this.state;

        return (
            <div>
                <BoardForm selectedBoard={selectedBoard} onSaveData={this.handleSaveData}/>

                <table border="1">
                    <tbody>
                    <tr align="center">
                        <td width="50">No.</td>
                        <td width="300">Title</td>
                        <td width="100">Name</td>
                        <td width="100">Date</td>
                    </tr>
                    {
                        boards.map(row =>
                            (<BoardItem key={row.brdno} row={row} onRemove={this.handleRemove} onSelectRow={this.handleSelectRow} />)
                        )
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Board;

