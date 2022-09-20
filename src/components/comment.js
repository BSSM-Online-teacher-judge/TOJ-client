import classNames from "classnames";
import { useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { Recomment } from '../allFiles';
import axios from "axios";

export default function Comment({ teacherId, commentId, content, hasChild })
{
    const [more, setMore] = useState(false);
    const [reComment, setReComment] = useState();

    const ReComment = async () => {
        try{
            setReComment(await getReComment())
            setMore((prev)=> !prev);
        }catch(error){
            console.log(error);
        }
    }

    const getReComment = () => {
        return axios.get(`/teacher/comment/${commentId}`)
    }
    
    return(
        <div className={classNames("commentRoot")}>
            <div className={classNames("commentRoot comment")}>
                <div className={classNames("commentRoot user")}>
                    <img src="/images/profileTest.png" alt="icon" className={classNames("user profile")} />
                    <span className={classNames("user nickname")}>ㅇㅇ</span>
                </div>
                <p className={classNames("comment content")}>{content}</p>
                <div className={classNames("comment detail")}>
                    {hasChild && <div>
                        <AiOutlineCaretDown/>
                    <button onClick={ReComment} className={classNames("detail button")}>더보기</button>
                    </div>}
                    {hasChild && more && reComment.map((value)=>
                        <Recomment teacherId={value.teacherId} commentId={value.commentId} content={value.content} hasChild={value.hasChild} />
                    )}
                </div>
            </div>
        </div>
    )
}