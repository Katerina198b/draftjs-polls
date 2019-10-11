import React, {Component} from 'react';
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  AtomicBlockUtils,
} from 'draft-js';
import {Map} from 'immutable';

import {InlineStyleControls, styleMap} from './InlineStyleControls';
import {BlockStyleControls} from './BlockStyleControls';
import {block} from 'bem-cn';

import './index.css'
import {FireBlock} from './FireBlock';
import {Poll} from '../Poll';
import {PollModal} from '../PollModal';

const b = block('editor');

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      isOpen: false,
    };
    // eslint-disable-next-line react/no-string-refs
    this.focus = () => this.refs.editor.focus();
  }

  onChange = editorState => {
    console.log(
      'content',
      editorState.getBlockTree(editorState.getSelection().getStartKey())
    );
    this.setState({editorState}, () => {
      //setTimeout(() => this.focus(), 0);
    });
  };

  openPollModal = () => {
    this.setState({isOpen: true})
  };

  closePollModal = () => {
    this.setState({isOpen: false})
  };

  togglePoll = (data) => {
    let newEditorState;
    const contentState = this.state.editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'poll',
      'IMMUTABLE',
      {data}
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    console.log('entk', entityKey);
    newEditorState = EditorState.set(
      this.state.editorState,
      {currentContent: contentStateWithEntity}
    );
    newEditorState = RichUtils.toggleBlockType(newEditorState, 'poll-block');

    this.onChange(RichUtils.insertSoftNewline(newEditorState));
    this.closePollModal();
  };

  toggleBlockType = blockType => {
    if (blockType === 'poll-block') {
      const startKey = this.state.editorState.getSelection().getStartKey();
      const selectedBlockType = this.state.editorState
        .getCurrentContent()
        .getBlockForKey(startKey)
        .getType();
      console.log(selectedBlockType)
      if (selectedBlockType === 'poll-block') {
        this.onChange(
          RichUtils.toggleBlockType(this.state.editorState, blockType)
        );
        return;
      }
      this.openPollModal();
      return;
    }
    this.onChange(
      RichUtils.toggleBlockType(this.state.editorState, blockType)
    );
  };

  toggleInlineStyle = inlineStyle => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle)
    );
  };

  render() {
    const {editorState} = this.state;

    const contentState = editorState.getCurrentContent();

    return (
      <div className={b({'placeholder': !contentState.hasText()})}>
        <PollModal
          onSubmit={this.togglePoll}
          isOpen={this.state.isOpen}
          onClose={this.closePollModal}
          onSubmit={this.togglePoll}
        />

        <div className={b('panel')}>
          <BlockStyleControls
            editorState={editorState}
            onToggle={this.toggleBlockType}
          />
          <InlineStyleControls
            editorState={editorState}
            onToggle={this.toggleInlineStyle}
          />
        </div>
        <div className={b('container')} onClick={this.focus}>
          <Editor
            blockRendererFn={getBlockRender}
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            onChange={this.onChange}
            placeholder="Tell your story ✍🏻..."
            ref="editor"
            //blockRenderMap={extendedBlockRenderMap}
          />
        </div>
      </div>
    );
  }
}

function getBlockStyle(block) {
  switch (block.getType()) {
    case 'code-block':
      return 'code-block';
    default:
      return null;
  }
}

function getBlockRender(block) {
  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote';
    case 'fire-block':
      return {
        component: FireBlock,
        editable: false,
    };
    case 'poll-block':
      return {
        component: Poll,
        editable: false,
      };
    default:
      return null;
  }
}
/*
const blockRenderMap = Map({
  'fire-block': {
    element: FireBlock,
  },
  'poll-block': {
    element: Poll,
  },
});
const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(
  blockRenderMap
);
*/
