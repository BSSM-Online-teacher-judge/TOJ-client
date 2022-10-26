import classNames from "classnames";
import "../../styles/comment.scss"
import { BsArrowReturnRight } from 'react-icons/bs';
import { useSelector } from "react-redux";

export default function Recomment({ content, createdAt })
{
    const sub = createdAt.substring(11, createdAt.length - 7)
    const time = Number(sub.split(':')[0]) + 9;
    const date = createdAt.substring(0, 10) + " " + time + ":" + sub.split(':')[1] + ":" + sub.split(':')[2];

    const users = useSelector((state) => state.users);

    return(
        <div className={classNames("recommentRoot")}>
            <BsArrowReturnRight className={classNames("recommentRoot-arrow")} />
            <div className={classNames("commentRoot")}>
                <div className={classNames("commentRoot commentDiv")}>
                    <div className={classNames("commentDiv-user")}>
                        <img src="/images/profileTest.png" alt="icon" className={classNames("user-profile")} />
                        <span className={classNames("user-nickname")}>ㅇㅇ</span>
                        <span className={classNames("user-date")}>{date}</span>
                    </div>
                    <p
                        className={classNames("commentDiv-content")}
                        dangerouslySetInnerHTML={{ __html: content }}
                    ></p>
                </div>
            </div>
        </div>
    )
}