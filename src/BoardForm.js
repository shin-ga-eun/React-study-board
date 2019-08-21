import React, { Component } from 'react';


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

