import ReactModal from 'react-modal';

import './AppModal.css';

import ClipLoader from "react-spinners/ClipLoader"

const LoadingModal = ({ isLoading }) => {

  return (
    <ReactModal
      isOpen={isLoading}
      className="appModal"
      shouldFocusAfterRender={false}
    >
      <ClipLoader
        color={"#fff"}
        size={150}
      />
    </ReactModal>
  )
};

export default LoadingModal;