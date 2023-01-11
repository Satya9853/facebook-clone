import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import EmojiPicker from "emoji-picker-react";

import Style from "./Post.module.css";

const CreateComment = () => {
  const [comment, setComment] = useState("");
  const [commentImage, setCommentImage] = useState("");
  const [error, setError] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [commentAreaCursorPosition, setCommentAreaCursorPosition] = useState();
  const commentAreaRef = useRef(null);
  const imageInputRef = useRef(null);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    commentAreaRef.current.selectionEnd = commentAreaCursorPosition;
  }, [commentAreaCursorPosition]);

  const handleEmojiClick = (emojiObject, event) => {
    const ref = commentAreaRef.current;
    ref.focus();
    const commentBeforeEmoji = comment.substring(0, ref.selectionStart);
    const commentAfterEmoji = comment.substring(ref.selectionStart);
    const commentAfterAddingEmoji = commentBeforeEmoji + emojiObject.emoji + commentAfterEmoji;
    setComment(commentAfterAddingEmoji);
    setCommentAreaCursorPosition(commentBeforeEmoji.length + emojiObject.emoji.length);
  };

  const imageHandler = (event) => {
    const file = event.target.files[0];
    if (file.type.split("/")[0] !== "image") {
      setError(`${file.name} format is unsupported ! select an image file`);
      return;
    } else if (file.size > 1024 * 1024 * 5) {
      setError("File size is too large, max 5mb is allowed");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setCommentImage(event.target.result);
    };
  };

  return (
    <div className={Style["create_comment_wrap"]}>
      <div className={Style["create_comment"]}>
        <img src={user?.user?.picture} alt="user" />
        <div className={Style["comment_input_wrap"]}>
          {showEmojiPicker && (
            <div className={Style["comment_emoji_picker"]}>
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
          <input type="file" accept="image/*" hidden ref={imageInputRef} onChange={imageHandler} />
          {error && (
            <div className={`${Style["post_error"]} ${Style["comment_error"]}`}>
              <div className={Style["post_error_text"]}>{error}</div>
              <button className="blue_btn" onClick={() => setError("")}>
                Try again
              </button>
            </div>
          )}
          <input
            type="text"
            ref={commentAreaRef}
            value={comment}
            placeholder="Write a Comment..."
            onChange={(event) => setComment(event.target.value)}
          />
          <div className={`${Style["comment_circle_icon"]} hover2`} onClick={() => setShowEmojiPicker((prev) => !prev)}>
            <i className="emoji_icon"></i>
          </div>
          <div className={`${Style["comment_circle_icon"]} hover2`} onClick={() => imageInputRef.current.click()}>
            <i className="camera_icon"></i>
          </div>
          <div className={`${Style["comment_circle_icon"]} hover2`}>
            <i className="gif_icon"></i>
          </div>
          <div className={`${Style["comment_circle_icon"]} hover2`}>
            <i className="sticker_icon"></i>
          </div>
        </div>
      </div>
      {commentImage && (
        <div className={Style["comment_image_preview"]}>
          <img src={commentImage} alt="comment" />
          <div className={Style["small_white_circle"]} onClick={() => setCommentImage("")}>
            <i className="exit_icon"></i>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateComment;
