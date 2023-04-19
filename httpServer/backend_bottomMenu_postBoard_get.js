import htmlBox from "../common/htmlBox.js";
import postBoardFileRead from "./backend_postBoardFileRead.js";
import cmServer from "./commonServer.js";
import mysql from "mysql";


export default function postBoard(request, response){
  
  postBoardFileRead(request, response);

  if (request.url.startsWith('/postBoard')) {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(htmlBox.htmlFunc(htmlBox.postBoard));
  }
  if(request.url.startsWith('/loadPostBoard')){
    console.log(request.url);
    let nth = request.url.split('=')[1];
    let conn = mysql.createConnection(cmServer.mysqlInfo);
        conn.connect();
        conn.query(
          `select * from dangstar order by post_date desc limit ${nth*3},3`,
          function (err, data) {
            if (err) throw err;
            else {
              response.writeHead(200);
              response.write(JSON.stringify(data));
              response.end();
            }}
        );
        conn.end();
  }
  let splitURL = request.url.split("/")[2];
  console.log(splitURL)
  // if(request.url.startsWith('/postBoard/postBoardLike')){
  if(splitURL === 'postBoardLike'){
    console.log("postBoardLike 진입")
    let body = "";
  
    request.on('data', function(data){
      body += data;
    })
    request.on("end", function(){ 
      console.log(body)
    })
  }

  

}