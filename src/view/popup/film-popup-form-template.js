import { COMMENT_EMOTIONS } from "../../mock/mock-data";

const createEmotion = (emotion, isChecked) => {
  return (
    `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emotion}" value="${emotion}" ${emotion === isChecked ? 'checked' : ''}>

    <label class="film-details__emoji-label" for="emoji-${emotion}" data-emotion-type=${emotion}>
      <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">
    </label>
    `);
};

export const createFilmPopupFormTemplate = (checkedEmotion, comment) =>
  `
    <form class="film-details__new-comment"  action="" method="get">
      <div class="film-details__add-emoji-label">
      ${(checkedEmotion) ? `<img src="images/emoji/${checkedEmotion}.png" width="55" height="55" alt="emoji-${checkedEmotion}">` : ''}
      </div>

      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">
        ${(comment) ? comment : ''}
        </textarea>
      </label>

      <div class="film-details__emoji-list">
      ${COMMENT_EMOTIONS.map((emotion) => createEmotion(emotion, checkedEmotion)).join('')}
      </div>
    </form>
  `;
