import React from 'react';
import Divider from '../../Divider/Divider';
import Modal, { ModalContent, ModalFooter, ModalHeading } from '../Modal';
import { card, doc, ns } from 'devcards';

ns('Modal');

const hideModal = (modal) => (atom) => () => (
  atom.set(props => ({
    ...props,
    [modal]: false,
  }))
);

const onHideConfirmModal = hideModal('confirmModalShown');
const onHideContentModal = hideModal('contentModalShown');
const onHideImageModal = hideModal('imageModalShown');

card('Modal',
  doc`A modal dialog useful for filling with all sorts of content.`,
  (atom) => {
    const state = atom.deref();
    return (
      <div>
        {!state.contentModalShown ? null :
          <Modal onHide={onHideContentModal(atom)}>
            <ModalHeading>{'A modal header'}</ModalHeading>
            <Divider />
            <ModalContent>
              <p>{'Hello, here is some modal content.'}</p>
              <p>{'You can click on the mask to close the modal.'}</p>
            </ModalContent>
          </Modal>
        }
        {!state.imageModalShown ? null :
          <Modal onHide={onHideImageModal(atom)}>
            <div style={{ height: 100, width: '100%', background: '#f00' }} />
            <Divider />
            <ModalContent>{'Note: the image above does not have any padding.'}</ModalContent>
          </Modal>
        }
        {!state.confirmModalShown ? null :
          <Modal onHide={onHideConfirmModal(atom)}>
            <ModalHeading>{'A confirm header'}</ModalHeading>
            <Divider />
            <ModalContent>{'Here is a confirm modal.'}</ModalContent>
            <ModalFooter>
              <button onClick={onHideConfirmModal(atom)}>{'Close'}</button>
            </ModalFooter>
          </Modal>
        }
        <button
          onClick={
          () => {
            atom.set(props => ({
              ...props,
              contentModalShown: true,
            }));
          }}
        >{'Show content modal'}</button>
        <button
          onClick={
          () => {
            atom.set(props => ({
              ...props,
              imageModalShown: true,
            }));
          }}
        >{'Show image modal'}</button>
        <button
          onClick={
          () => {
            atom.set(props => ({
              ...props,
              confirmModalShown: true,
            }));
          }}
        >{'Show confirm modal'}</button>
      </div>
    );
  },
  {
    contentModalShown: false,
    imageModalShown: false,
    confirmModalShown: false,
  });
