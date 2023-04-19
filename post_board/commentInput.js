function commentInput(postWrap, src_comment_link, textName, cmText){
  let test = document.cookie;
  console.log(test);
  let userID = test.split("jwt=")[1];

  // 댓글 입력창 감싸는 div
  const commentWrap = tagCreate("div", {});
  styleCreate(commentWrap, {
    //border: "1px solid black",
    padding: "15px",
  });
  postWrap.appendChild(commentWrap);

  // 댓글 입력창과 작성 버튼을 감쌀 form 요소
  // const commentForm = tagCreate("form", {action:"/commentSubmit", method: "POST"});
  const commentForm = tagCreate("form", {id: "commentSubmitForm"});
  styleCreate(commentForm, {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  });
  commentWrap.appendChild(commentForm);
  
  console.dir(document.getElementById('commentSubmitForm'));

  // 댓글 입력할 textarea
  const commentInput = tagCreate("input", {
    type: "text",
    name: "commentValue",
    placeholder: "내용을 입력해주세요",
  });
  styleCreate(commentInput, {
    width: "85%",
    height: "38px",
    outline: "none",
  });
  commentForm.appendChild(commentInput);

  // 댓글 작성 버튼
  const commentSubmit = tagCreate("input", {
    id: "submitBtn",
    type: "button",
    value: "작성",
  });
  styleCreate(commentSubmit, {
    width: "60px",
    height: "38px",
  });
  let submit = document.getElementById('submitBtn');
  commentForm.appendChild(commentSubmit);
  submit.onclick = commentSubmitFunc();

  const commentId = tagCreate("input", {
    type: "hidden",
    name: "id_request",
    value: userID,
  });
  commentForm.appendChild(commentId);

  // const commentIndex = tagCreate("input", {
  //   type: "hidden",
  //   name: "post_index",
  //   value: "test",
  // });
  // commentForm.appendChild(commentId);

  function commentSubmitFunc() {
    console.log("FormData 함수 내부 진입")
    let commentFormData = new formData(document.getElementById('commentSubmitForm'))
    let cmXhr = new XMLHttpRequest();
    cmXhr.open("POST", "/commentSubmit", true);
    cmXhr.send(commentFormData);

    cmXhr.onreadystatechange = function() {
      if (cmXhr.readyState === 4 && cmXhr.status === 200) {
        console.log("응답받음");
      }
    }
  }


  //최신 댓글 1개 보여주는 함수 실행
  commentRecent(postWrap, src_comment_link, textName, cmText);

}