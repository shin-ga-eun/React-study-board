import React, { Component } from 'react';

/*
BoardForm 컴포넌트
-> 입력상자 (사용자로부터 brdtitle, brdwriter를 받아온다.) 

메소드 정리
shouldComponentUpdate: 부모로부터 받은 selectedBoard에 brdno가 있으면, 글 수정이므로 입력상자에 이전값을 넣어주고, 없으면, 글 삽입이므로 ''값을 넣어준다.
                        true값을 반환하므로써 렌더링한다.
handleSubmit: save버튼을 누르면, json형식으로 data에 저장해서 부모의 onSaveData에 data를 넘겨준다.
                                만약, 부모로부터 받은 selectedBoard에 brdno가 있으면, 
                                data의 brdno, brddate를 기존 selectedBoard의 brdno, brddate로 저장해서 넘겨준다.


*/

class BoardForm extends Component {
    
    //컴포넌트 업데이트 시 리렌더링을 결정하는 함수: true반환시 렌더링.
    shouldComponentUpdate(nextProps, nextState) {
        let selectedBoard = nextProps.selectedBoard;
       
        //update 글 수정(입력상자 초기화)
        if (!selectedBoard.brdno) {
            this.brdtitle.value = "";
            this.brdwriter.value = "";        
            return true;
        }
        
        //insert 글 삽입
        this.brdtitle.value = selectedBoard.brdtitle;
        this.brdwriter.value = selectedBoard.brdwriter;        
        return true;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let selectedBoard = this.props.selectedBoard;
        let data = {
            brdwriter: this.brdwriter.value,
            brdtitle: this.brdtitle.value
        }
        if (selectedBoard.brdno) {
            data.brdno = selectedBoard.brdno
            data.brddate = selectedBoard.brddate
        }        
        this.props.onSaveData(data);
    }


    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input placeholder="title" ref={node => this.brdtitle = node}/>
                <input placeholder="name" ref={node => this.brdwriter = node}/>
                <button type="submit">Save</button>
            </form>
        );
    }
}

export default BoardForm;

