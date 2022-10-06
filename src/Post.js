import React, { useState } from "react";

export function Post({ title, body, comment }) {
    const [ showInfo, setShowInfo ] = useState(false)

    return (
        <div className="post">
            <div className="post_header">
                <h3 onClick={() => setShowInfo(!showInfo)} className="post_title">{title}</h3>
            </div>
            {showInfo && <div className="post_body">
                <article>{body}</article>
                <p className="post_comment"><span>Comment:</span> {comment}</p>
            </div>}
        </div>
    )
}