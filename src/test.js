import React, { Component } from 'react';

/*
    delete & update a Item(Row)
*/
class App5 extends Component {
    constructor(props) {
        super(props);
        this.childForm = React.createRef(); 
    }
    
    state = {
        maxNo: 3,
        boards: [
            {
                brdno: 1,
                brdwriter: 'Lee SunSin',
                brdtitle: 'If you intend to live then you die',
                brddate: new Date()
            },
            {
                brdno: 2,
                brdwriter: 'So SiNo',
                brdtitle: 'Founder for two countries',
                brddate: new Date()
            }
        ]
    }
    
    //글 저장 -> 이부분은 지금 서버랑 하는 게 아니므로 배열에 값을 추가하는 방식으로 구현.
    handleSaveData = (data) => {
        let boards = this.state.boards;
        if (data.brdno ===null || data.brdno==='' || data.brdno===undefined) {    // new : Insert (새로운 행 삽입)
            this.setState({
                maxNo: this.state.maxNo+1,
                boards: boards.concat({brdno: this.state.maxNo, brddate: new Date(), ...data })
            });
        } else {                                                        // Update (이전 행 수정)
            this.setState({
                boards: boards.map(row => data.brdno === row.brdno ? {...data }: row)
            })            
        }
    }
    
    //글 삭제
    handleRemove = (brdno) => {
        this.setState({
            boards: this.state.boards.filter(row => row.brdno !== brdno)
        })
    }
    
    handleSelectRow = (row) => {
         this.childForm.current.handleSelectRow(row);
    }
    
    //메인 렌더링하는 부분
    //boards (게시판테이블)을 렌더링하는 거
    render() {
        const { boards } = this.state;

        return (
            <div>
                <BoardForm onSaveData={this.handleSaveData}  ref={this.childForm}/>
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


//게시판 요소 컴포넌트 (부모 App으로 부터 전달받음)
class BoardItem extends React.Component {
    handleRemove = () => {
        const { row, onRemove } = this.props;
        onRemove(row.brdno);
    }    
    handleSelectRow = () => {
        const { row, onSelectRow } = this.props;
        onSelectRow(row);
    }    
    render() {
        console.log(this.props.row.brdno);
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


//게시판 입력 폼 컴포넌트
class BoardForm extends Component {
    state = {
        brdwriter:'',
        brdtitle:''        
    }
    
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    handleSelectRow = (row) => {
        this.setState(row);
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSaveData(this.state);
        this.setState({
            brdno:'',
            brdwriter:'',
            brdtitle:''
        });
    }
    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input placeholder="title" name="brdtitle" value={this.state.brdtitle} onChange={this.handleChange}/>
                <input placeholder="name" name="brdwriter" value={this.state.brdwriter} onChange={this.handleChange}/>
                <button type="submit">Save</button>
            </form>
        );
    }
}

export default App5;

