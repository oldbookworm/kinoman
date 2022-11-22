import {generateComments} from "../mock/mock-comment";

export default class CommentsModel {
  #comments = generateComments();

  get comments() {
    return this.#comments;
  }
};

