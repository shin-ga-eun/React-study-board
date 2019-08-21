## simple board(CRUD) examples for React ##
리액트로만 구현했기 때문에 만약 게시판의 글을 수정하는 경우에,
사용자가 선택한 행을 부모에게 알리고, 부모가 다시 BoardForm(입력상자)으로 전송하는 방식으로 구현하였다.
사용자가 입력을 완료하고 저장하면, 다시 입력한 내용을 부모에게 전송해서 부모의 state 변수에 저장하는 방식으로 구현하였다.
따라서 컴포넌트 수정마다 부모를 다시 거쳐서 값이 전달되어야 한다.

### Files ###

- test.js: delete & update a Item(Row)
- Board.js: component files
- BoardForm.js: component files
- BoardItem.js: component files


<출처>
 https://forest71.tistory.com/184?category=683254 [SW 개발이 좋은 사람]


  
