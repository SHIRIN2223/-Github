import React, { useState } from "react";
import { DELETE_TYPE, EDIT_TYPE, READ_TYPE } from "./ButtonTypes";
import CustomButton from "./CustomButton";


const BookCard = ({ bookInfo, deleteClick, readUpdateClick, handleEdit }) => {
  const [editMode, setEditMode] = useState(false);
  // console.log(editMode);

  console.log("BookCard", bookInfo);

  return (
    <div className="d-flex justify-content-between align-items-center border p-3 shadow ">
      <div>
        {editMode ? (
          <form
            className="d-flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();

              // kitaplar dizisini gunceller
              handleEdit(bookInfo, e.target[0].value);
              // düzenleme modunu kapat
              setEditMode(false);
            }}
          >
            <input className="form-control shadow" defaultValue={bookInfo.bookTitle} />
            <button className="btn btn-success shadow"> Kaydet </button>
          </form>
        ) : (
          <h5
            style={{
              textDecoration: bookInfo.isRead ? "line-through" : "none",
            }}
          >
            {bookInfo.bookTitle}
          </h5>
        )}

        <p>{bookInfo.date}</p>
      </div>

      <div className="btn-group">
        <CustomButton title={"Sil"} type={DELETE_TYPE} onClick={deleteClick} />
        <CustomButton
          title={editMode ? "İptal Et" : "Düzenle"}
          type={EDIT_TYPE}
          onClick={() => setEditMode(!editMode)}
        />
        <CustomButton
          title={bookInfo.isRead === false ? "Okunmadı" : "okundu"}
          type={READ_TYPE}
          onClick={readUpdateClick}
        />
      </div>

   
    </div>
  );
};

export default BookCard;
