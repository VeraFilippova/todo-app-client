import { useState } from "react";
import { useCookies } from "react-cookie";

const Modal = ({ mode, setShowModal, getData, task }) => {
  const [cookies, setCookie, removeCookies] = useCookies(null);

  const editMode = mode === "edit" ? true : false;

  const [date, setData] = useState({
    user_email: editMode ? task.user_email : cookies.Email,
    title: editMode ? task.title : null,
    process: editMode ? task.prgress : 50,
    date: editMode ? task.date : new Date(),
  });

  const postData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(date),
      });
      if (response.status === 200) {
        console.log("work");
        setShowModal(false);
        getData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const editData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/todos/${task.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(date),
        }
      );
      if (response.status === 200) {
        console.log("update");
        setShowModal(false);
        getData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((date) => ({
      ...date,
      [name]: value,
    }));
    console.log(date);
  };

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>Lets {mode} you task</h3>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>
        <form>
          <input
            required
            maxLength={30}
            placeholder=" Your task goes here"
            name="title"
            value={date.title}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="range">Drag to select</label>
          <input
            required
            type="range"
            min="0"
            max="100"
            id="range"
            name="progress"
            value={date.prgress}
            onChange={handleChange}
          />
          <input
            className={mode}
            type="submit"
            onClick={editMode ? editData : postData}
          />
        </form>
      </div>
    </div>
  );
};

export default Modal;
