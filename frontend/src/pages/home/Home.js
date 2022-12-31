import { useRef, useState } from "react";
import Header from "../../components/header/Header";
import useClickOutside from "../../components/shared/hooks/clickOutside-hook";

const Home = () => {
  const [showModal, setShowModal] = useState(true);
  const elementRef = useRef(null);

  const handleShowModal = () => {
    setShowModal(false);
  };

  const removeEventListenerFunction = useClickOutside(elementRef, handleShowModal);

  return (
    <div>
      <Header />
      {/* {showModal && <div className="card" ref={elementRef}></div>} */}
    </div>
  );
};

export default Home;
