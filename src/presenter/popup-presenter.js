import PopupContainerView from '../view/popup/popup-container-view';
import PopupInnerView from '../view/popup/popup-inner-view';
import PopupTopBlockView from '../view/popup/popup-top-block-view';
import PopupCloseBtnView from '../view/popup/popup-close-btn-view';
import PopupFilmInfoView from '../view/popup/popup-film-info-view';
import PopupControlsView from '../view/popup/popup-controls-view';
import PopupBottomBlockView from '../view/popup/popup-bottom-block-view';
import PopupCommentsContainerView from '../view/popup/popup-comments-container-view';
import PopupCommentsListView from '../view/popup/popup-comments-list-view';
import PopupNewCommentView from '../view/popup/popup-new-comment-view';
import {render} from '../render.js';

export default class PopupPresenter {
  containerComponent = new PopupContainerView();
  innerComponent = new PopupInnerView();
  topContainerComponent = new PopupTopBlockView();
  bottomContainerComponent = new PopupBottomBlockView();
  commentsContainerComponent = new PopupCommentsContainerView();
  commentsListComponent = new PopupCommentsListView();


  init = (container) => {
   this.container = container;

    render(this.containerComponent, this.container);
    render(this.innerComponent, this.containerComponent.getElement());
    render(this.topContainerComponent, this.innerComponent.getElement());
    render(new PopupCloseBtnView(), this.topContainerComponent.getElement());
    render(new PopupFilmInfoView(), this.topContainerComponent.getElement());
    render(new PopupControlsView(), this.topContainerComponent.getElement());
    render(this.bottomContainerComponent, this.innerComponent.getElement());
    render(this.commentsContainerComponent, this.bottomContainerComponent.getElement());
    render(this.commentsListComponent, this.commentsContainerComponent.getElement());
    render(new PopupNewCommentView(), this.commentsContainerComponent.getElement());
  };

 }
