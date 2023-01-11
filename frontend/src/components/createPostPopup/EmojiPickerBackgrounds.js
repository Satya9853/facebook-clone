import React, { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";

import Style from "./CreatePostPopup.module.css";

const EmojiPickerBackgrounds = ({ text, user, setText, type2, background, setBackground }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showBackgroundPicker, setShowBackgroundPicker] = useState(false);
  const [textAreaCursorPosition, setTextAreaCursorPosition] = useState();
  const textAreaRef = useRef(null);
  const bgRef = useRef(null);

  // setup for emoji picker
  useEffect(() => {
    textAreaRef.current.selectionEnd = textAreaCursorPosition;
  }, [textAreaCursorPosition]);

  const handleEmojiClick = (emojiObject, event) => {
    const ref = textAreaRef.current;
    ref.focus();
    const textBeforeEmoji = text.substring(0, ref.selectionStart);
    const textAfterEmoji = text.substring(ref.selectionStart);
    const textAfterAddingEmoji = textBeforeEmoji + emojiObject.emoji + textAfterEmoji;
    setText(textAfterAddingEmoji);
    setTextAreaCursorPosition(textBeforeEmoji.length + emojiObject.emoji.length);
  };

  // setup for background
  const postBackgrounds = [
    "../../../images/postbackgrounds/1.jpg",
    "../../../images/postbackgrounds/2.jpg",
    "../../../images/postbackgrounds/3.jpg",
    "../../../images/postbackgrounds/4.jpg",
    "../../../images/postbackgrounds/5.jpg",
    "../../../images/postbackgrounds/6.jpg",
    "../../../images/postbackgrounds/7.jpg",
    "../../../images/postbackgrounds/8.jpg",
    "../../../images/postbackgrounds/9.jpg",
  ];

  const handlebackground = (index) => {
    bgRef.current.style.backgroundImage = `url(${postBackgrounds[index]})`;
    setBackground(postBackgrounds[index]);
    bgRef.current.classList.add(Style["bg_handler"]);
  };

  const removeBackground = () => {
    bgRef.current.style.backgroundImage = "";
    setBackground("");
    bgRef.current.classList.remove(Style["bg_handler"]);
  };

  return (
    <div className={type2 ? Style["image_input"] : ""}>
      <div className={!type2 ? Style["flex_center"] : ""} ref={bgRef}>
        <textarea
          ref={textAreaRef}
          maxLength="250"
          value={text}
          className={`${Style["post_input"]} ${type2 ? Style["input2"] : ""}`}
          placeholder={`What's on your mind, ${user?.user?.firstName}`}
          onChange={(event) => setText(event.target.value)}
          style={{ paddingTop: `${background ? Math.abs(textAreaRef.current.value.length * 0.1 - 30) : "0"}%` }}
        ></textarea>
      </div>
      <div className={!type2 ? Style["post_emojis_wrap"] : ""}>
        {showEmojiPicker && (
          <div className={`${Style["comment_emoji_picker"]} ${type2 ? Style["movepicker2"] : Style["rlmove"]}`}>
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
        {!type2 && <img src="../../../icons/colorful.png" alt="background" onClick={() => setShowBackgroundPicker((prev) => !prev)} />}
        {!type2 && showBackgroundPicker && (
          <div className={Style["post_backgrounds"]}>
            <div
              className={Style["no_bg"]}
              onClick={() => {
                removeBackground();
              }}
            ></div>
            {postBackgrounds.map((bg, index) => (
              <img
                src={bg}
                key={index}
                alt="background"
                onClick={() => {
                  handlebackground(index);
                }}
              />
            ))}
          </div>
        )}
        <i className={`emoji_icon_large ${type2 ? Style["moveleft"] : ""}`} onClick={() => setShowEmojiPicker((prev) => !prev)}></i>
      </div>
    </div>
  );
};

export default EmojiPickerBackgrounds;
